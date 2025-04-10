import React, { useContext } from "react";
import { BlogContext } from "../pages/blog.page";
import CommentFeild from "./comment-field.component";
import axios from "axios";

export const fetchComments = async ({
  skip = 0,
  blog_id,
  setParentCommentCountFun,
  comment_array = null
}) => {
  let res;

  await axios
    .post("http://localhost:3000/get-blog-comments", { blog_id, skip })
    .then(({ data }) => {
      data.map((comment) => {
        comment.childrenLevel = 0;
      });

      setParentCommentCountFun((prev) => prev + data.length);

      if (comment_arr == null) {
        res = { results: data };
      } else {
        res = { results: [...comment_array, ...data] };
      }
    });
};

const CommentContainer = () => {
  let {
    blog: { title },
    commentsWrapper,
    setCommentsWrapper
  } = useContext(BlogContext);
  return (
    <div
      className={
        "fixed max-sm:w-full " +
        (commentsWrapper ? "top-0 sm:right-0" : " top-[-100%] sm:right-[-100%]") +
        " z-50 h-full w-[30%] min-w-[350px] overflow-y-auto overflow-x-hidden bg-white p-8 px-16 shadow-2xl duration-700 max-sm:right-0 sm:top-0"
      }>
      <div className="relative">
        <h1 className="text-xl font-medium">Comments</h1>
        <p className="text-dark-grey mt-2 line-clamp-1 w-[70%] text-lg">{title}</p>

        <butto
          className="bg-grey absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full"
          onClick={() => setCommentsWrapper((prev) => !prev)}>
          <i className="fi fi-br-cross mt-1 text-2xl"></i>
        </butto>
      </div>

      <hr className="border-grey my-8 -ml-10 w-[120%]" />

      <CommentFeild action="comment" />
    </div>
  );
};

export default CommentContainer;
