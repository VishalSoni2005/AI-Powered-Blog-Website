import express from "express";
import { signup, signin, googleAuth } from "../Controller/AuthController.js";
import { uploadBanner } from "../Controller/Upload.js"; // Use named import
import { CreateBlog } from "../Controller/BlogRoutes.js";
import { verifyJWT } from "../Middlewares/VerifyJWT.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google-auth", googleAuth);

// File upload route
router.post("/upload", uploadBanner);

// Create Blog route
router.post('/create-blog', verifyJWT, CreateBlog);
// router.post('/create-blog', CreateBlog);

export default router;
