import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const blogStructure = {
  title: "",
  des: "",
  banner: "",
  content: [],
  tags: [],
  author: { personal_info: {} },
  publishedAt: ""
};

export default function BlogPage() {
  let { blog_id } = useParams();

  const [blog, setBlog] = useState(null);

  let {
    title,
    des,
    banner,
    content,
    author: {
      personal_info: { fullname, username, profile_img }
    },
    publishedAt
  } = blog;

  const fetchBlog = () => {
    try {
      const request = axios.post("http://localhost/3000/get-blog", { blog_id });
      const data = request.data.blog;
      setBlog(data);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return <div>BlogPage {blog.title}</div>;
}
