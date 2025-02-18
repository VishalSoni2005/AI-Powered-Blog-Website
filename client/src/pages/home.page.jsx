import React, { useEffect, useState } from 'react'
import AnimationWrapper from '../common/page-animation'
import axios from 'axios';
import InPageNavigation from '../components/inpage-navigation.component'
import Loader from "../components/loader.component";
import BlogPostCard from '../components/blog-post.component';

export default function HomePage() {

  let [blogs, setBlogs] = useState(null);

  useEffect(() => {
    getLatestBlogs();
  }, [])

  const getLatestBlogs = async () => {  // use this funciton in useEffect to get latest blogs 
    try {
      const latestBlog = await axios.get("http://localhost:3000/latest-blogs")

      const blogsArray = latestBlog.data.blogs;

      setBlogs(blogsArray);   //! blog from backend is stored to useState form here
      // console.log("blogsArray => ", blogsArray);
      console.log("blogsArray => ", blogs); // show value after first render  
    }
    catch (err) {
      console.error("Error fetching latest blogs", err)
    }
  }
  return (
    <AnimationWrapper>
      <section className='h-cover flex justify-center gap-10'>
        {/* latest blogs */}
        <div className='w-full '>
          <InPageNavigation defaultHidden={["trending blogs"]} routes={["home", "trending blogs"]}>


            <>
              {
                blogs == null ?
                  <Loader />
                  :
                  blogs.map((blog, i) => {
                    return (
                      <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }} key={i}>

                        <BlogPostCard content={blog} author={blog.author.personal_info}  />
                      </AnimationWrapper>
                    )
                  })


              }
            </>
          </InPageNavigation>
        </div>

        {/* popular blogs and filter */}
        <div>

        </div>
      </section>
    </AnimationWrapper>
  )
}
