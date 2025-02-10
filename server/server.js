import express from 'express';
import 'dotenv/config';
import connectDB from './config/database.js';
import routes from './Routes/Routes.js';
import cors from 'cors';
import { connectCloudinary } from './config/cloud.js';
import fileUpload from 'express-fileupload';

const app = express();

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    }),
); //* special middleware to upload files

// Enable CORS
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));

// routes
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`👍👍Server is running on port ${PORT}`);
});
