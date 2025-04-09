import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import BlogContent from "../components/blog-content.component";
import Loader from "../components/loader.component";
import BlogInteraction from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-post.component";

export const blogStructure = {
  title: "",
  des: "",
  banner: "",
  content: [],
  tags: [],
  author: { personal_info: {} },
  publishedAt: ""
};

export const BlogContext = createContext({});

export default function BlogPage() {
  let { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure); // note initial value of blog is set as blogStructure coz it will be used in useEffect
  const [loading, setLoading] = useState(true);
  const [similarBlogs, setsimilarBlogs] = useState(null);
  const [isLikedByUser, setLikeByUser] = useState(false);
  const [commentsWrapper, setCommentsWrapper] = useState(false);

  let {
    title,
    banner,
    content,
    author: {
      personal_info: { fullname, username: author_username, profile_img }
    },
    publishedAt
  } = blog;

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const {
        data: { blog }
      } = await axios.post("http://localhost:3000/get-blog", { blog_id });

      setBlog(blog);

      const { data } = await axios.post("http://localhost:3000/search-blogs", {
        tag: blog.tags[0] || "",
        limit: 6,
        eliminate_blog: blog_id
      });

      setsimilarBlogs(data.blogs);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetstate = () => {
    setBlog(blogStructure);
    setsimilarBlogs(null);
    setLoading(true);
  };
  useEffect(() => {
    resetstate();
    fetchBlog();
  }, [blog_id]);
  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <BlogContext.Provider value={{ blog, setBlog, isLikedByUser, setLikeByUser }}>
          <div className="center max-w-[900px] py-10 max-lg:px-[5vw]">
            <img src={banner} className="aspect-video" alt="" />

            <div className="mt-12">
              <h2>{title}</h2>

              <div className="my-8 flex justify-between max-sm:flex-col">
                <div className="flex items-start gap-5">
                  <img src={profile_img} className="h-12 w-12 rounded-full" alt="" />
                  <p className="Capitalize">
                    {fullname}
                    <br />@{/* on clicking the below link it will redirect to user profile */}
                    <Link to={`/user/${author_username}`} className="text-dark-grey underline">
                      {author_username}
                    </Link>
                  </p>
                </div>

                <p className="text-dark-grey opacity-75 max-sm:ml-12 max-sm:mt-6 max-sm:pl-5">
                  Published on: {new Date(publishedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <BlogInteraction />
            <div className="font-gelasio blog-page-content my-12">
              {content[0].blocks.map((block, i) => {
                return (
                  <div key={i} className="my-4 md:my-8">
                    <BlogContent block={block} />
                  </div>
                );
              })}
            </div>

            <BlogInteraction />

            {similarBlogs != null && similarBlogs.length ? (
              <>
                <h1 className="mb-10 mt-14 text-2xl font-medium">Similar Blogs</h1>
                {similarBlogs.map((blog, i) => {
                  let {
                    author: { personal_info }
                  } = blog;

                  return (
                    <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                      <BlogPostCard content={blog} author={personal_info} />
                    </AnimationWrapper>
                  );
                })}
              </>
            ) : null}
          </div>
        </BlogContext.Provider>
      )}
    </AnimationWrapper>
  );
}
