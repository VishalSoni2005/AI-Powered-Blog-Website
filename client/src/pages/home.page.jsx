import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import InPageNavigation, { activeTabRef } from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import NaMsgData from "../components/nodata.component";

export default function HomePage() {
  let [blogs, setBlogs] = useState(null);
  let [trendingBlogs, setTrendingBlogs] = useState(null);
  let [pageState, setPageState] = useState("home"); //* setting up the page state

  //todo: modify this

  let categories = [
    "ai",
    "tech",
    "finance",
    "lic",
    "travel",
    "business",
    "education",
    "health",
    "property",
    "politics",
    "manipulation",
    "psychological"
  ];

  useEffect(() => {
    activeTabRef.current.click();

    if (pageState == "home") {
      getLatestBlogs();
    } else {
      getBlogsByCategory(pageState);
    }

    if (!trendingBlogs) {
      getTrendingBlogs();
    }
  }, [pageState]);

  const getBlogsByCategory = async (category) => {
    try {
      const request = await axios.post("http://localhost:3000/search-blogs", {
        category: pageState
      });

      const reqData = await request.data.blogs;

      setBlogs(reqData);
      console.log("blogsArray => ", reqData); // show value after first render
    } catch (err) {
      console.error("Error fetching blogs by category", err);
      toast.error("Error fetching blogs by category: " + category);
    }
  };

  const getLatestBlogs = async () => {
    // use this funciton in useEffect to get latest blogs
    try {
      const latestBlog = await axios.get("http://localhost:3000/latest-blogs");

      const blogsArray = latestBlog.data.blogs;

      setBlogs(blogsArray); //! blog from backend is stored to useState form here
      // console.log("blogsArray => ", blogsArray);
      // console.log("blogsArray => ", blogs); // show value after first render
    } catch (err) {
      console.error("Error fetching latest blogs", err);
    }
  };

  const getTrendingBlogs = async () => {
    try {
      const trendingBlog = await axios.get("http://localhost:3000/trending-blogs");

      const blogsArray = trendingBlog.data.blogs;

      setTrendingBlogs(blogsArray); //! blog from backend is stored to useState form here
    } catch (err) {
      console.error("Error fetching latest blogs", err);
    }
  };

  //! start from here
  const filterBlogsByCategory = (e) => {
    let category = e.target.innerText.toLowerCase();

    setBlogs(null); //todo

    if (pageState == category) {
      setPageState("home");
      return;
    }

    setPageState(category);
  };
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* latest blogs */}
        <div className="w-full">
          <InPageNavigation
            defaultHidden={["trending blogs"]}
            routes={[pageState, "trending blogs"]}>
            <>
              {blogs == null ? (
                <Loader />
              ) : blogs.length ? (
                blogs.map((blog, i) => {
                  return (
                    <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }} key={i}>
                      <BlogPostCard content={blog} author={blog.author.personal_info} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NaMsgData message={"No blog found"} />
              )}
            </>

            {trendingBlogs == null ? (
              <Loader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }} key={i}>
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NaMsgData message={"No trending blog found"} />
            )}
          </InPageNavigation>
        </div>

        {/* popular blogs and filter */}
        <div className="border-1 border-grey min-w-[40%] max-w-min pl-8 pt-3 max-md:hidden lg:min-w-[400px]">
          <div className="flex flex-col gap-10">
            <div className="">
              <h1 className="mb-8 text-xl font-medium">Your Trending Blogs</h1>
              <div className="flex flex-wrap gap-3">
                {categories.map((category, i) => (
                  <button
                    onClick={filterBlogsByCategory}
                    className={`tag ` + (pageState == category ? "bg-black text-white" : "")}
                    key={i}>
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="font medium mb-8 text-xl">
                Trending <i className="fi fi-rr-arrow-trend-up"></i>
              </h1>

              {trendingBlogs == null ? (
                <Loader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }} key={i}>
                      <MinimalBlogPost blog={blog} index={i} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NaMsgData message={"No trending blog found"} />
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
