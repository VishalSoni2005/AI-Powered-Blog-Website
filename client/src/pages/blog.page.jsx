import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogInteraction from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-post.component";

export const blogStructure = {
  title: "",
  des: "",
  banner: "",
  content: [],
  author: { personal_info: { fullname, username: author_username, profile_img } },
  publishedAt: ""
};

export const BlogContext = createContext({});

export default function BlogPage() {
  let { blog_id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const [similarBlogs, setsimilarBlogs] = useState(null);

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
      // nested post requests
      //! error expected
      axios
        .post("http://localhost/3000/get-blog", { blog_id })
        .then(({ data: { blog } }) => {
          setBlog(blog);

          axios
            .post("http://localhost/3000/search-blogs", {
              tag: tags[0],
              limie: 6,
              eliminate_blog: blog_id
            })
            .then(({ data }) => {
              setsimilarBlogs(data.blogs);
              console.log(data.blogs);
            });

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog", error);
        });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    resetstate();
    fetchBlog();
  }, [blog_id]);

  const resetstate = () => {
    setBlog(blogStructure);
    setsimilarBlogs(null);
    setLoading(true);
  };
  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <BlogContext.Provider value={{ blog, setBlog }}>
          <div className="center max-w-[900px] py-10 max-lg:px-[5vw]">
            <img src={banner} className="aspect-video" alt="" />

            <div className="mt-12">
              <h2>{title}</h2>

              <div className="my-8 flex justify-between max-sm:flex-col">
                <div className="flex items-start gap-5">
                  <img src={profile_img} className="h-12 w-12 rounded-full" alt="" />
                  <p className="Capitalize">
                    {fullname}
                    <br />@
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
            {/* {Blog Content} */}

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
