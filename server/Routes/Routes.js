import express from "express";
import { signup, signin, googleAuth } from "../Controller/AuthController.js";
import { uploadBanner } from "../Controller/Upload.js"; // Use named import
import {
  countLatestBlogs,
  CreateBlog,
  latestBlogs,
  searchBlogs,
  searchBlogsCountForCategory,
  trendingBlogs
} from "../Controller/BlogRoutes.js";
import { verifyJWT } from "../Middlewares/VerifyJWT.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google-auth", googleAuth);

// File upload route
router.post("/upload", uploadBanner);

// Blog route
router.post("/create-blog", verifyJWT, CreateBlog);
router.post("/search-blogs", searchBlogs);
router.post("/latest-blogs", latestBlogs);
router.get("/trending-blogs", trendingBlogs);


router.post("/all-latest-blogs-count", countLatestBlogs);
router.post("/search-blogs-count", searchBlogsCountForCategory);

export default router;
