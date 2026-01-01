import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { UserContext } from "../App";
import AboutUser from "../components/about.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import InPageNavigation from "../components/inpage-navigation.component";
import BlogPostCard from "../components/blog-post.component";
import NaMsgData from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import NotFound from "./404.page";

export const profileStructure = {
  personal_info: {
    username: "",
    fullname: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_posts: 0,
    total_reads: 0,
  },
  social_links: {},
  joinedAt: "",
};

const ProfilePage = () => {
  let {
    userAuth: { username },
  } = useContext(UserContext);
  //* userContext contain, access_token and username

  let { id: profileId } = useParams();
  let [profile, setProfile] = useState(profileStructure);
  let [loading, setLoading] = useState(true);
  let [blogs, setBlogs] = useState(null);
  let [profileLoaded, setProfileLoaded] = useState("");

  let {
    personal_info: { username: profile_username, fullname, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = profile;

  const fetchUserProfile = async () => {
    try {
      const request = await axios.post("http://localhost:8080/get-profile", {
        username: profileId,
      });

      const { user } = request.data;
      console.log(user);

      if (user != null) {
        setProfile(user);
      }
      setProfileLoaded(profileId);
      getBlogs({ user_id: user._id });
      setLoading(false); //! learned how loading animation will go if user fetched
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error(
          "Error fetching user profile:",
          error.response.data.message
        );
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  //* resetting the states to their initial values
  const resetStates = () => {
    setProfile(profileStructure);
    setLoading(true);
    profileLoaded("");
  };

  const getBlogs = ({ props = 1, user_id }) => {
    user_id = user_id == undefined ? blogs.user_id : user_id;

    axios
      .post("http://localhost:8080/search-blogs", { author: user_id, page })
      .then(async ({ data }) => {
        let formatedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { author: user_id },
        });

        formatedData.user_id = user_id;
        setBlogs(formatedData);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  };

  useEffect(() => {
    if (profileId != profileLoaded) {
      setBlogs(null);
    }
    if (blogs == null) {
      resetStates();
      fetchUserProfile();
    }
  }, [profileId, blogs]);
  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : profile_username.length ? (
        <section className="h-cover flex-row-reverse items-start gap-5 md:flex min-[1100px]:gap-12">
          <div className="md:border-1 border-grey flex min-w-[250px] flex-col gap-5 max-md:items-center md:sticky md:top-[100px] md:w-[50%] md:py-10 md:pl-8">
            <img
              src={profile_img}
              alt={fullname}
              className="bg-grey h-48 w-48 rounded-full md:h-32 md:w-32"
            />
            <h1 className="text-2xl font-medium">@{profile_username}</h1>
            <p className="h-6 text-xl capitalize">{fullname}</p>
            <p>
              {total_posts.toLocaleString()} Blogs -{" "}
              {total_reads.toLocaleString()} Reads
            </p>
            //* now we make an edit profile btn, it is visible when you are
            loged in
            <div className="mt-2 flex gap-4">
              {profileId == username ? (
                <Link
                  to="/settings/edit-profile"
                  className="btn-light rounded-md"
                >
                  Edit Profile
                </Link>
              ) : (
                ""
              )}
            </div>
            <AboutUser
              bio={bio}
              social_links={social_links}
              joinedAt={joinedAt}
              className="max-md:hidden"
            />
          </div>

          <div className="w-full max-md:mt-12">
            <InPageNavigation
              defaultHidden={["About"]}
              routes={["Blogs Published", "About"]}
            >
              <>
                {blogs == null ? (
                  <Loader />
                ) : blogs.results.length ? (
                  blogs.results.map((blog, i) => {
                    return (
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                        key={i}
                      >
                        <BlogPostCard
                          content={blog}
                          author={blog.author.personal_info}
                        />
                      </AnimationWrapper>
                    );
                  })
                ) : (
                  <NaMsgData message={"No blog found"} />
                )}

                {/* //! complex component  */}
                <LoadMoreDataBtn state={blogs} fetchDataFn={getBlogs} />
                {/* //* above LoadMoreDataBtn will change the page number */}
              </>
              <AboutUser
                bio={bio}
                social_links={social_links}
                joinedAt={joinedAt}
              />
            </InPageNavigation>
          </div>
        </section>
      ) : (
        <NotFound />
      )}
    </AnimationWrapper>
  );
};

export default ProfilePage;
