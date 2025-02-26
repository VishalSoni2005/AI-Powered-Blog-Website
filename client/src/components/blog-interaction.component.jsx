import React, { useContext } from "react";
import { BlogContext } from "../pages/blog.page";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export default function BlogInteraction() {
  let {
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
    setBlog
  } = useContext(BlogContext);


  let { UserAuth: { username } } = useContext(UserContext);

  return (
    <>
      <hr className="border-grey my-2" />
      <div className="flex justify-between gap-6">
        <div className="flex items-center gap-3">
          <button className="bg-grey/80 hover:bg-red/80 flex h-10 w-10 items-center justify-center rounded-full">
            <i className="fi fi-rr-heart"></i>
          </button>
          <p className="text-dark-grey text-xl">{total_likes}</p>

          <button className="bg-grey/80 hover:bg-red/80 flex h-10 w-10 items-center justify-center rounded-full">
            <i className="fi fi-rr-comment-dots"></i>
          </button>
          <p className="text-dark-grey text-xl">{total_comments}</p>
        </div>

        <div className="flex items-center gap-6">

            {
                username === author_username? (
                  <Link to={`/editor/${blog_id}/${blog_id}`}>
                    <i className="fi fi-rr-pencil hover:text-purple text-xl"></i>
                  </Link>
                ) : (
                  " "
                )
            }
          <Link to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}>
            <i className="fi fi-brands-x-twitter hover:text-twitter text-xl"></i>
          </Link>
        </div>
      </div>
      <hr className="border-grey my-2" />
    </>
  );
}
