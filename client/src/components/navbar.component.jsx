import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../imgs/logo.png";
// import logoTwo from '../imgs/pen.svg';

import logoTwo from "../imgs/blog.svg";

import { UserContext } from "../App";
import UserNavigationPanel from "./user-navigation.component";
import defaultAvatar from "../imgs/user.png";

export default function Navbar() {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [navPanel, setNavPanel] = useState(false);
  let navigate = useNavigate();

  const handleUserNavPanel = () => {
    setNavPanel((prev) => !prev);
  };

  const handleBlur = () => {
    setNavPanel(false);
  };

  const {
    userAuth,
    userAuth: { access_token, profile_img }
  } = useContext(UserContext);

  const handleSearch = (e) => {
    const query = e.target.value;
    if ( e.keyCode === 13 && query.length) {
      console.log(query);
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="w-10 flex-none">
          <img src={logoTwo} alt="Logo" />
        </Link>

        <p className="font-gelasio hidden -translate-x-6 transform-gpu text-2xl duration-150 md:block">
          Vishal Writes
        </p>

        {/* Search Bar */}
        <div
          className={`border-grey absolute left-0 top-full mt-0.5 w-full border-b bg-white px-[5vw] py-4 md:relative md:inset-0 md:block md:w-auto md:border-0 md:p-0 ${
            searchBoxVisibility ? "hide" : "show"
          }`}>
          <input
            onKeyDown={handleSearch}
            type="text"
            placeholder="Search"
            className="bg-grey placeholder:text-dark-grey w-full rounded-full p-4 pl-6 pr-[12px] md:w-auto md:pl-12 md:pr-6"
          />
          <i className="fi fi-rr-search text-dark-grey absolute right-[10px] top-1/2 -translate-y-1/2 text-xl md:pointer-events-none md:left-5"></i>
        </div>

        <div className="ml-auto flex items-center gap-3 md:gap-6">
          {/* Mobile Search Button */}
          <button
            className="bg-grey flex h-12 w-12 items-center justify-center rounded-full md:hidden"
            onClick={() => setSearchBoxVisibility((prev) => !prev)}>
            <i className="fi fi-rr-search text-xl"></i>
          </button>

          {/* Editor Link */}
          <Link to="/editor" className="link hidden gap-2 md:flex">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>

          {/* //TODO: this point distinguish between logedin and unlogedin users */}

          {access_token ? (
            <>
              {/* Notifications */}
              <Link to="/dashboard/notification">
                <button className="bg-grey hover:bg-red/10 relative h-12 w-12 rounded-full">
                  <i className="fi fi-rr-bell mt-1 block text-2xl"></i>
                </button>
              </Link>

              {/* User Profile */}
              <div className="relative" onMouseLeave={handleBlur}>
                <button className="mt-1 h-12 w-12" onClick={handleUserNavPanel}>
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={profile_img || defaultAvatar}
                  />
                </button>

                {navPanel && <UserNavigationPanel />}
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="/signin">
                Sign In
              </Link>
              <Link className="btn-light hidden py-2 md:block" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
}
