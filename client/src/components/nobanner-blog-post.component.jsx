import React from "react";
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

export default function MinimalBlogPost({ blog, index }) {
  let {
    title,
    tags,
    publishedAt,
    banner,
    blog_id: id,
    author: {
      personal_info: { fullname, profile_img, username }
    }
  } = blog;
  return (
    <Link to={`/blog/${id}`} className="mb-8 flex gap-5">
      <h1 className="blog-index"> {index > 10 ? "0" + (index + 1) : index + 1} </h1>

      <div>
        <div className="mb-7 flex items-center gap-2">
          <img src={profile_img} className="h-6 w-6 rounded-full" />

          <p className="line-clamp-1">
            {fullname} @{username}
          </p>
          <p className="min-w-fit">{getDay(publishedAt)}</p>
        </div>
        <h1 className="blog-title"> {title}</h1>
      </div>
    </Link>
  );
}
