import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";

const CommentFeild = ({ action }) => {
  const [comment, setComment] = useState("");

  const {
    userAuth: { access_token }
  } = useContext(UserContext);

  const handleComment = () => {
    if (!access_token) {
      return toast.error("Please login to comment");
    }

    if(!comment.length) {
      return toast.error("Comment cannot be empty");
    }

    console.log(comment);

    // send this comment to backend


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
