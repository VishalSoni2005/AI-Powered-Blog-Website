import express from "express";
import "dotenv/config";
import connectDB from "./config/database.js";
import routes from "./Routes/Routes.js";
import cors from "cors";
import { connectCloudinary } from "./config/cloud.js";
import fileUpload from "express-fileupload";

const app = express();

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
); //* special middleware to upload files

// Middleware to handle CORS policy.

// ✅ Properly configured CORS (only allow frontend URL)
app.use(cors());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend running on Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true // Allow cookies/auth headers
  })
);

// ✅ Set Cross-Origin-Opener-Policy properly
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  next();
});

// routes
app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`👍👍Server is running on port ${PORT}`);
});
