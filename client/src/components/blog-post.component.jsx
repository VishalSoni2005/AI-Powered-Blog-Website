import React from "react";
import { getDay } from "../common/date";
import { Link } from "react-router-dom";

export default function BlogPostCard({ content, author }) {
  let {
    publishedAt,
    tags,
    title,
    des,
    banner,
    activity: { total_likes },
    blog_id: id
  } = content;

  let { fullname, profile_img, username } = author;
  return (
    //todo:
    <Link to={`/blog/${id}`} className="border-grey mb-4 flex items-center gap-8 border-b pb-5">
      {/* 
        //? whenever i click on any element of this div it will redirect me to blog page of blog */}
      <div className="w-full">
        <div className="mb-7 flex items-center gap-2">
          <img src={profile_img} className="h-6 w-6 rounded-full" />

          <p className="line-clamp-1">
            {fullname} @{username}
          </p>
          <p className="min-w-fit">{getDay(publishedAt)}</p>
        </div>

        <h1 className="blog-title">{title}</h1>

        <p className="font-gelasio my-3 line-clamp-2 text-xl leading-7 max-sm:hidden md:max-[1100px]:hidden">
          {des}
        </p>

        <div className="mt-7 flex gap-4">
          <span className="btn-light px-4 py-1">{tags[0]}</span>

          <span className="text-dark-grey ml-3 flex items-center gap-2">
            <i className="fi fi-rr-heart text-xl"></i>
            {total_likes}
          </span>
        </div>
      </div>
      <div className="bg-grey aspect-square h-28">
        <img src={banner} className="aspect-square h-full w-full object-cover" alt="" />
      </div>
    </Link>
  );
}
