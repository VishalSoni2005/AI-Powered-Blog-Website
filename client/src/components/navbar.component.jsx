
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logo from '../imgs/logo.png';

import { UserContext } from '../App';
import UserNavigationPanel from './user-navigation.component';

export default function Navbar() {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [navPanel, setNavPanel] = useState(false);

  const handleUserNavPanel = () => {
    setNavPanel(prev => !prev);
  };

  const handleBlur = () => {
    setNavPanel(false);
  };

  const {
    userAuth,
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={Logo} alt="Logo" />
        </Link>

        {/* Search Bar */}
        <div
          className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto ${
            searchBoxVisibility ? 'show' : 'hide'
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12px] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10px] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          {/* Mobile Search Button */}
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setSearchBoxVisibility(prev => !prev)}
          >
            <i className="fi fi-rr-search text-xl"></i>
          </button>

          {/* Editor Link */}
          <Link to="/editor" className="hidden md:flex gap-2 link">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>

          {access_token ? (
            <>
              {/* Notifications */}
              <Link to="/dashboard/notification">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-red/10">
                  <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                </button>
              </Link>

              {/* User Profile */}
              <div className="relative" onMouseLeave={handleBlur}>
                <button className="w-12 h-12 mt-1" onClick={handleUserNavPanel}>
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={profile_img || '/default-avatar.png'}
                    alt="Profile Pic"
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
              <Link className="btn-light py-2 hidden md:block" to="/signup">
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




// import React, { useContext, useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import Logo from '../imgs/logo.png';

// import { UserContext } from '../App';
// import UserNavigationPanel from './user-navigation.component';

// export default function Navbar() {
//   const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

//   const [navPanel, showNavPanel] = useState(false);

//   const handleUserNavPanel = () => {
//     showNavPanel(!navPanel);
//   };
//   const handelblur = () => {
//     setTimeout(() => {
//       showNavPanel(false);
//     }, 300);
//   };

//   const {
//     userAuth,
//     userAuth: { access_token, profile_img },
//   } = useContext(UserContext);

//   return (
//     <>
//       <nav className="navbar">
//         <Link to="/" className="flex-none w-10">
//           <img src={Logo} alt="Logo" />
//         </Link>

//         <div
//           className={
//             'absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ' +
//             (searchBoxVisibility ? 'show' : 'hide')
//           }
//         >
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12px] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
//           />
//           <i className="fi fi-rr-search absolute right-[10px] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
//         </div>

//         <div className="flex items-center gap-3 md:gap-6 ml-auto">
//           <button
//             className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
//             onClick={() => {
//               setSearchBoxVisibility(!searchBoxVisibility);
//             }}
//           >
//             <i class="fi fi-rr-search text-xl"></i>
//           </button>

//           <Link to="/editor" className="hidden md:flex gap-2 link">
//             <i className="fi fi-rr-file-edit"></i>
//             <p>Write</p>
//           </Link>

//           {access_token ? (
//             <>
//               <Link to="/dashboard/notification">
//                 <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-red/10">
//                   <i className="fi fi-rr-bell text-2xl block mt-1"></i>
//                 </button>
//               </Link>

//               <div className="relative" onBlur={handelblur} onClick={handleUserNavPanel}>
//                 <button className="w-12 h-12 mt-1">
//                   <img
//                     className="w-full h-fulll object-cover rounded-full"
//                     src={profile_img}
//                     alt="Profile Pic"
//                   />
//                 </button>

//                 {navPanel ? <UserNavigationPanel /> : ''}
//               </div>
//             </>
//           ) : (
//             <>
//               <Link className="btn-dark py-2" to="/signin">
//                 Sign In
//               </Link>
//               <Link className="btn-light py-2 hidden md:block" to="/signup">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </nav>

//       <Outlet />
//     </>
//   );
// }
