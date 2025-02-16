import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

export default function UserNavigationPanel() {
  const {
    userAuth: { username },
    setUserAuth
  } = useContext(UserContext);

  const signoutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  return (
    <AnimationWrapper className="absolute right-0 z-50" transition={{ duration: 0.3 }}>
      <div className="border-grey absolute right-2 w-60 border bg-white duration-200">
        <Link to="/editor" className="link flex gap-2 py-4 pl-8 md:hidden">
          <i className="fi fi-rr-edit"></i>
          <p>Write</p>
        </Link>

        <Link to={`/user/${username}`} className="link py-4 pl-8">
          Profile
        </Link>

        <Link to={`/dashboard/blogs`} className="link py-4 pl-8">
          Dashboard
        </Link>

        <Link to={`/settings/edit-profile`} className="link py-4 pl-8">
          Settings
        </Link>

        <span className="border-grey absolute w-[100%] border-t"></span>

        <button className="hover:bg-grey w-full p-4 py-4 pl-8 text-left" onClick={signoutUser}>
          <h1 className="mg-1 text-xl font-bold">Sign Out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
}
