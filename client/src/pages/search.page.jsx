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
import UserCard from "../components/usercard.component";

export default function SearchPage() {
  const { query } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [users, setUsers] = useState(null);

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
    setUsers(null);
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.post("http://localhost:3000/search-users", { query });
      setUsers(response.data.users);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    resetState();
    fetchUsers();
    searchBlogs({ page: 1, createNewArray: true });
  }, [query]);

  const UserCardWrapper = () => {
    return (
      <>
        {users == null ? (
          <Loader />
        ) : users.length ? (
          users.map((user, i) => {
            return (
              <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }} key={i}>
                <UserCard user={user} />
              </AnimationWrapper>
            );
          })
        ) : (
          <NaMsgData message={"No user found"} /> // ✅
        )}
      </>
    );
  };

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
            <LoadMoreDataBtn state={blogs} fetchDataFn={searchBlogs} />
          </>

          <UserCardWrapper />
        </InPageNavigation>
      </div>

      <div className="border-1 border-grey min-w-[40%] max-w-min pl-8 pt-3 max-md:hidden lg:min-w-[350px]">
        <h1 className="mb-8 text-xl font-medium">
          User Related To {query} <i className="fi fi-rr-user mt-1"></i>
        </h1>
        <UserCardWrapper />
      </div>
    </section>
  );
}
