import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import AuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import NotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";

export const UserContext = createContext({});
//* userContext contain access_token, username, fullname, profile_img
const App = () => {
  const [userAuth, setUserAuth] = useState({});
  useEffect(() => {
    let userInSession = lookInSession("user"); //* this fetches jwt token and username from session as accrss token

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:blog_id" element={<Editor />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<AuthForm type="sign-in" />} />
          <Route path="/signup" element={<AuthForm type="sign-up" />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="/blog/:blog_id" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
