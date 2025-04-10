import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BlogContext } from "../pages/blog.page";

const CommentFeild = ({ action }) => {
  const [comment, setComment] = useState("");

  let {
    blog,
    blog: {
      _id,
      author: { _id: blog_author },
      comments,
      activity,
      activity: { total_comments, total_parent_comments }
    },
    setBlog,
    setTotalParentCommentsLoaded
  } = useContext(BlogContext);

  const {
    userAuth: { access_token, username, fullname, profile_img }
  } = useContext(UserContext);

  const handleComment = async () => {
    try {
      if (!access_token) {
        return toast.error("Please login to comment");
      }

      if (!comment.length) {
        return toast.error("Comment cannot be empty");
      }

      console.log(comment);

      // send this comment to backend

      const commentData = await axios.post(
        "http://localhost:3000/add-comment",
        { _id, blog_author, comment },
        {
          headers: {
            Authorization: "Bearer " + access_token
          }
        }
      );

      const data = commentData.data;

      setComment("");
      data.commented_by = { personal_info: { username, fullname, profile_img } };

      // main comment array
      let newCommentArr;

      data.childerLevel = 0; // used to define lvl of comments

      newCommentArr = [data];

      let parentCommentIncrement = 1;

      setBlog({
        ...blog,
        comments: { ...comments, results: newCommentArr },
        activity: {
          ...activity,
          total_comments: total_comments + 1,
          total_parent_comments: total_parent_comments + parentCommentIncrement
        }
      });

      setTotalParentCommentsLoaded((prev) => prev + parentCommentIncrement);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <>
      <Toaster />
      <textarea
        className="input-box placeholder:text-dark-grey h-[150px] resize-none overflow-auto pl-5"
        value={comment}
        placeholder="Write a comment"
        onChange={(e) => setComment(e.target.value)}></textarea>

      <button onClick={handleComment} className="btn-dark mt-5 px-10">
        {action}
      </button>
    </>
  );
};

export default CommentFeild;
