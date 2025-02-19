import express from "express";
import { signup, signin, googleAuth } from "../Controller/AuthController.js";
import { uploadBanner } from "../Controller/Upload.js"; // Use named import
import {
  CreateBlog,
  latestBlogs,
  searchBlogs,
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

// Create Blog route
router.post("/create-blog", verifyJWT, CreateBlog);
router.post('/search-blogs', searchBlogs);
router.get("/latest-blogs", latestBlogs);
router.get("/trending-blogs", trendingBlogs);

export default router;
