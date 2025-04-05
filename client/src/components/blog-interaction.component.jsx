import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BlogContext } from "../pages/blog.page";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";

export default function BlogInteraction() {
  let {
    blog,
    blog: {
      blog_id,
      title,
      des,
      banner,
      content,
      tags,
      activity,
      activity: { total_likes, total_reads, total_comments },
      author: {
        personal_info: { username: author_username }
      }
    },
    setBlog,
    isLikedByUser,
    setLikeByUser
  } = useContext(BlogContext);

  let {
    userAuth: { username, access_token }
  } = useContext(UserContext);

  const handleLikeClick = async () => {
    try {
      if (access_token) {
        setLikeByUser((prev) => !prev);
        !isLikedByUser ? total_likes++ : total_likes--;

        setBlog({ ...blog, activity: { ...activity, total_likes } });
      } else {
        toast.error("Please login to like the blog.");
      }
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <hr className="border-grey my-2" />
      <div className="flex justify-between gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleLikeClick}
            className={`bg-grey/80 hover:bg-red/80 flex h-10 w-10 items-center justify-center rounded-full ${isLikedByUser} ? "bg-red" : ""`}>
            <i className={"fi " + (isLikedByUser ? "fi-rr-heart" : " fi-sr-heart")}></i>
          </button>

          <p className="text-dark-grey text-xl">{total_likes}</p>

          <button className="bg-grey/80 hover:bg-red/80 flex h-10 w-10 items-center justify-center rounded-full">
            <i className="fi fi-rr-comment-dots"></i>
          </button>

          <p className="text-dark-grey text-xl">{total_comments}</p>
        </div>

        <div className="flex items-center gap-6">
          {username == author_username ? (
            <Link to={`/editor/${blog_id}`}>
              <i className="fi fi-rr-pencil hover:text-purple text-xl"></i>
            </Link>
          ) : (
            " "
          )}
          <Link to={`https://twitter.com/intent/tweet?text=Read${title}&url=${location.href}`}>
            <i className="fi fi-brands-x-twitter hover:text-twitter text-xl"></i>
          </Link>
        </div>
      </div>
      <hr className="border-grey my-2" />
    </>
  );
}
