import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";
import { nanoid } from "nanoid";

export const CreateBlog = async (req, res) => {
  // only authenticated users can access this endpoint

  try {
    const authId = req.user;
    let { title, des, tags, banner, content, draft } = req.body;

    //* this is req.body content
    // let blogObject = {
    //   title,
    //   content: content,
    //   des,
    //   tags,
    //   banner,
    //   draft: false
    // };

    if (!title) {
      return res.status(400).json({
        message: "Bad Request",
        note: "Title is required"
      });
    }

    // //* buggy code
    // if (!draft) {
    //   if (!title || !des) {
    //     return res.status(400).json({
    //       message: "Bad Request",
    //       note: "Please fill all the fields"
    //     });
    //   }
    //   if (!banner.length) {
    //     return res.status(400).json({
    //       message: "Bad Request",
    //       note: "Please upload a banner image"
    //     });
    //   }

    //   //* content is object generated from editorjs.
    //   //* content object contain block array
    //   if (!content.blocks.length) {
    //     //!error expected
    //     return res.status(400).json({
    //       message: "Bad Request",
    //       note: "Please write some content"
    //     });
    //   }

    //   if (!tags.length) {
    //     return res.status(400).json({
    //       message: "Bad Request",
    //       note: "Please add tags"
    //     });
    //   }
    // }

    //* optimaized code
    if (!draft) {
      if (!des || !banner || !content?.blocks?.length || !tags?.length) {
        return res.status(400).json({
          message: "Bad Request",
          note: "Please fill all required fields"
        });
      }
    }

    //* lowercasing all tags
    tags = tags.map((i) => i.toLowerCase());

    //todo: creating dynamic blog id
    const blogId = `${title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim()}-${nanoid(8)}`;

    const blog = new Blog({
      blog_id: blogId,
      title,
      banner,
      des,
      content,
      tags,
      author: authId,
      draft: Boolean(draft)
    });

    await blog.save();
    const incrementVal = draft ? 0 : 1;

    await User.findOneAndUpdate(
      { _id: authId },
      {
        $inc: { "account_info.total_posts": incrementVal },
        $push: { blogs: blog._id }
      }
    );

    res.status(201).json({
      message: "Blog created successfully",
      data: blog,
      id: blog.blog_id
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      note: "Error in Create Blog request"
    });
  }
};

//* get all blog entries
export const latestBlogs = async (req, res) => {
  try {
    let maxLimit = 5;

    //todo: this populate method will add the user info form user schema to blog schema
    const blogData = await Blog.find({ draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.fullname -_id"
      )
      .sort({ publishedAt: -1 }) //? to get latest blog first and old as ordered
      .select("blog_id title des banner activity tags publishedAt -_id")
      .limit(maxLimit);

    //? this is send to frontend blog object
    //todo: blogdata is an object contain maxLimit's number of objects and
    //todo: each object contain blog_id, title, des, banner, activity, tags, publishedAt, and user info from user schema

    // console.log("blogData -> ", blogData);

    res.status(200).json({
      message: "Success",
      blogs: blogData
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      note: "Error in get latest blog request"
    });
  }
};

export const trendingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.fullname -_id"
      )
      .sort({
        "activity.total_read": -1,
        "activity.total_likes": -1,
        publishedAt: -1
      }) // sort on basis of number of read
      .select("blog_id title publishedAt -_id")
      .limit(5);

    res.status(200).json({
      message: "Success",
      blogs
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      note: "Error in get latest blog request"
    });
  }
};
