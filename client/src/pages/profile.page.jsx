import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { UserContext } from "../App";
import AboutUser from "../components/about.component";

export const profileStructure = {
  personal_info: {
    username: "",
    fullname: "",
    profile_img: "",
    bio: ""
  },
  account_info: {
    total_posts: 0,
    total_reads: 0
  },
  social_links: {},
  joinedAt: ""
};

const ProfilePage = () => {
  let {
    userAuth: { username }
  } = useContext(UserContext);
  //* userContext contain, access_token and username

  let { id: profileId } = useParams();
  let [profile, setProfile] = useState(profileStructure);
  let [loading, setLoading] = useState(true);

  let {
    personal_info: { username: profile_username, fullname, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt
  } = profile;

  const fetchUserProfile = async () => {
    try {
      const request = await axios.post("http://localhost:3000/get-profile", {
        username: profileId
      });

      const { user } = request.data;
      console.log(user);

      setProfile(user);
      setLoading(false); //! learned how loading animation will go if user fetched
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error("Error fetching user profile:", error.response.data.message);
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
  };

  useEffect(() => {
    resetStates();
    fetchUserProfile();
  }, [profileId]);
  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <section className="h-cover flex-row-reverse items-start gap-5 md:flex min-[1100px]:gap-12">
          <div className="flex min-w-[250px] flex-col gap-5 max-md:items-center">
            <img
              src={profile_img}
              alt={fullname}
              className="bg-grey h-48 w-48 rounded-full md:h-32 md:w-32"
            />
            <h1 className="text-2xl font-medium">@{profile_username}</h1>
            <p className="h-6 text-xl capitalize">{fullname}</p>
            <p>
              {total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads
            </p>
            //* now we make an edit profile btn, it is visible when you are loged in
            <div className="mt-2 flex gap-4">
              {profileId == username ? (
                <Link to="/settings/edit-profile" className="btn-light rounded-md">
                  Edit Profile
                </Link>
              ) : (
                ""
              )}
            </div>

            <AboutUser bio={bio} social_links={social_links} joinedAt={joinedAt} className="max-md:hidden"  />
          </div>
        </section>
      )}
    </AnimationWrapper>
  );
};

export default ProfilePage;
