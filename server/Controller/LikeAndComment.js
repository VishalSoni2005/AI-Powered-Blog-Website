import Blog from "../Schema/Blog.js";
import Comment from "../Schema/Comment.js";
import User from "../Schema/User.js";
import Notification from "../Schema/Notification.js";

export const likeBlog = async (req, res) => {
  try {
    const user_id = req.user;
    const { _id, isLikedByUser } = req.body;

    let increment = isLikedByUser ? -1 : 1;

    const updatedBlog = await Blog.findByIdAndUpdate(
      { _id },
      { $in: { "activity.total_likes": increment } },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (!isLikedByUser) {
      const like = new Notification({
        type: "like",
        blog: _id,
        notification_for: updatedBlog.author,
        user: user_id
      });
      like.save().then(() => {
        return res.status(200).json({ liked_by_user: true });
      });
    } else {
      await Notification.findOneAndDelete({
        type: "like",
        blog: _id,
        notification_for: updatedBlog.author,
        user: user_id
      }).then((data) => {
        return res.status(200).json({ liked_by_user: false });
      });
    }
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const isLikedByUser = async (req, res) => {
  try {
    const user_id = req.user;
    const { _id } = req.body;

    const isLiked = await Notification.exists({
      // return null if no doc found or 1 if doc found it return an object
      user: user_id,
      type: "like",
      blog: _id
    });

    return res.status(200).json({ isLiked });
  } catch (error) {
    console.error("Error checking like status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const user_id = req.user;
    const { _id, comment, replying_to, blog_author } = req.body;

    if (!comment.length) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    let commentObj = {
      blog_id: _id,
      blog_author,
      comment,
      commented_by: user_id
    };

    if (replying_to) {
      
      commentObj.parent = replying_to;
      commentObj.isReply = true;
    }

    new Comment(commentObj).save().then(async (commentFile) => {
      let { comment, commentedAt, children } = commentFile;

      Blog.findOneAndUpdate(
        { _id },
        {
          $push: { comments: commentFile._id },
          $inc: {
            "activity.total_comments": 1,
            "activity.total_parent_comments": replying_to ? 0 : 1
          }
        }
      ).then((blog) => {
        console.log("new comment added to blog: ", blog);
      });
    });

    let notificationObj = {
      type: replying_to ? "reply" : "comment",
      blog: _id,
      notification_for: blog_author,
      user: user_id,
      comment: commentFile._id
    };

    if (replying_to) {
      notificationObj.replyied_on_comment = replying_to;

      await Comment.findOneAndUpdate(
        { _id: replying_to },
        { $puch: { children: commentFile._id } }
      ).then((replyToCommentDoc) => {
        notificationObj.notification_for = replyToCommentDoc.commented_by;
      });
    }

    new Notification(notificationObj).save().then((notification) => {
      console.log("New Notification");
    });
    return res
      .status(200)
      .json({ comment, commentedAt, _id: commentFile._id, user_id, children });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    let { blog_id, skip } = req.body;

    let maxLimit = 5;

    Comment.find({ blog_id, isReply: false })
      .populate(
        "commented_by",
        "personal_info.profile_img personal_info.username personal_info.fullname"
      )
      .skip(skip)
      .limit(maxLimit)
      .sort({
        commentedAt: -1
      })
      .then((comments) => {
        return res.status(200).json({ comments });
      });
  } catch (error) {
    console.error("Error getting blog comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReplies = async () => {
  let { _id, skip } = req.body;
  let maxLimit = 5;
  Comment.findOne({ _id })
    .populate({
      path: "children",
      Option: {
        limit: maxLimit,
        skip: skip,
        sort: { commentedAt: -1 }
      },
      populate: {
        path: "commented_by",
        select:
          "personal_info.profile_img personal_info.username personal_info.fullname"
      },
      select: "-blog_id -updatedAt"
    })
    .then((doc) => {
      return res.status(200).json({ replies: doc.children });
    })
    .catch((error) => {
      console.error("Error getting replies:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};
