import express from "express";
import { signup, signin, googleAuth } from "../Controller/AuthController.js";
import { uploadBanner } from "../Controller/Upload.js"; // Use named import
import {
  countLatestBlogs,
  CreateBlog,
  latestBlogs,
  searchBlogs,
  // searchBlogs,
  searchBlogsCountForCategory,
  searchUsers,
  trendingBlogs
} from "../Controller/BlogRoutes.js";
import { getProfile } from "../Controller/UserController.js";
import { verifyJWT } from "../Middlewares/VerifyJWT.js";
import { BlogPage } from "../Controller/BlogPage.js";


const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google-auth", googleAuth);

// File upload route
router.post("/upload", uploadBanner);

// Blog route
router.get("/trending-blogs", trendingBlogs);
router.post("/create-blog", verifyJWT, CreateBlog);
router.post("/search-blogs", searchBlogs);
router.post("/latest-blogs", latestBlogs);

// blog search users
router.post("/search-users", searchUsers);

// Blog count routes
router.post("/all-latest-blogs-count", countLatestBlogs);
router.post("/search-blogs-count", searchBlogsCountForCategory);

// User routes
router.post("/get-profile", getProfile);

// Blog page Route
router.post("/get-blog", BlogPage)

export default router;
