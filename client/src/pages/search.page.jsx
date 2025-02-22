import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "../components/blog-post.component";
import NaMsgData from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import axios from "axios";
import { filterPaginationData } from "../common/filter-pagination-data";

export default function SearchPage() {
  const { query } = useParams();
  const [blogs, setBlogs] = useState(null);

  const searchBlogs = async ({ page = 1, createNewArray = false }) => {
    try {
      const latestBlog = await axios.post("http://localhost:3000/search-blogs", { query, page });

      const formatedData = await filterPaginationData({
        state: blogs,
        data: latestBlog.data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: { query },
        createNewArray
      });

      setBlogs(formatedData); //! blog from backend is stored to useState form here
    } catch (err) {
      console.error("Error fetching latest blogs", err);
    }
  };
  const resetState = () => {
    setBlogs(null);
  };

  useEffect( () => {
    resetState
    searchBlogs({page : 1, createNewArray : true});
  }, [query]);

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`Search: Results from ${query}`, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}>
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
              fetchDataFn={searchBlogs}
            />
          </>
        </InPageNavigation>
      </div>
    </section>
  );
}
