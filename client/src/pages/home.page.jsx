import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import InPageNavigation, { activeTabRef } from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import NaMsgData from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";

export default function HomePage() {
  let [blogs, setBlogs] = useState(null); //todo: note this blog contain blog data in format as:
  //* {results:[],page:1,totalDocs:0}
  let [trendingBlogs, setTrendingBlogs] = useState(null);
  let [pageState, setPageState] = useState("home"); //* setting up the page state
  //? this pagestate contains the category of the blog to be shown

  //todo: modify this
  let categories = [
    "ai",
    "tech",
    "finance",
    "stock",
    "market",
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

  // const getBlogsByCategory = async ({ page = 1 }) => {
  //   try {
  //     const request = await axios.post("http://localhost:3000/search-blogs", {
  //       tag: pageState,
  //       page
  //     });

  //     const formatedData = await filterPaginationData({
  //       state: blogs,
  //       data: request.data.blogs,
  //       page,
  //       countRoute: "/search-blogs-count",
  //       data_to_send: { tag: pageState }
  //     });

  //     setBlogs(formatedData);
  //   } catch (err) {
  //     console.error("Error fetching blogs by category", err);
  //     toast.error("Error fetching blogs by category: " + pageState);
  //   }
  // };

  const getBlogsByCategory = async ({ page = 1 }) => {
    try {
      const request = await axios.post("http://localhost:3000/search-blogs", {
        category: pageState, // ✅ Changed from `tag`
        page: Number(page) || 1 // ✅ Ensure it's a number
      });

      const formatedData = await filterPaginationData({
        state: blogs,
        data: request.data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: { category: pageState } // ✅ Ensure consistency
      });

      setBlogs(formatedData);
    } catch (err) {
      console.error("Error fetching blogs by category:", err);
      toast.error("Error fetching blogs by category: " + pageState);
    }
  };

  const getLatestBlogs = async ({ page = 1 }) => {
    // use this funciton in useEffect to get latest blogs
    try {
      const latestBlog = await axios.post("http://localhost:3000/latest-blogs", { page });

      const formatedData = await filterPaginationData({
        state: blogs,
        data: latestBlog.data.blogs,
        page,
        countRoute: "/all-latest-blogs-count"
      });

      console.log("Formatted blogs ==>> ", formatedData);
      setBlogs(formatedData); //! blog from backend is stored to useState form here
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

  const filterBlogsByCategory = (e) => {
    let category = e.target.innerText.toLowerCase();

    setBlogs(null); //todo
    if (pageState == category) {
      setPageState("home");
      return;
    }

    setPageState(category);
  };

  useEffect(() => {
    activeTabRef.current.click();

    if (pageState == "home") {
      getLatestBlogs({ page: 1 });
    } else {
      getBlogsByCategory({ page: 1 });
    }

    if (!trendingBlogs) {
      getTrendingBlogs();
    }
  }, [pageState]);

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
              ) : blogs.results.length ? (
                blogs.results.map((blog, i) => {
                  return (
                    <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }} key={i}>
                      <BlogPostCard content={blog} author={blog.author.personal_info} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NaMsgData message={"No blog found"} />
              )}
              <LoadMoreDataBtn
                state={blogs}
                fetchDataFn={pageState == "home" ? getLatestBlogs : getBlogsByCategory}
              />
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

        {/* trending blogs and filter */}
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
