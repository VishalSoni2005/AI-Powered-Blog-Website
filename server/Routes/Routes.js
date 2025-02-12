// import express from "express";
// import { signup, signin, googleAuth } from "../Controller/AuthController.js";
// const Upload = require('../Controller/Upload.js')

// const router = express.Router();

// // Auth routes
// router.post("/signup", signup);
// router.post("/signin", signin);
// router.post("/google-auth", googleAuth);

// // file upload
// router.post("/upload-banner-image", Upload.uploadBanner);

// export default router;


import express from "express";
import { signup, signin, googleAuth } from "../Controller/AuthController.js";
import { uploadBanner } from "../Controller/Upload.js"; // Use named import

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google-auth", googleAuth);

// File upload route
router.post("/upload", uploadBanner);

export default router;
