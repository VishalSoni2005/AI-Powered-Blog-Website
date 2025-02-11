// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// export const connectCloudinary = () => {
//     try {
//         cloudinary.config({
//             cloud_name: process.env.CLOUD_NAME,
//             api_key: process.env.API_KEY,
//             api_secret: process.env.API_SECRET,
//         });
//     } catch (error) {
//         console.error('Error connecting to Cloudinary:', error);
//     }
// };

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

export const connectCloudinary = () => {
    const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
        console.error('Missing Cloudinary environment variables.');
        return;
    }

    cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET,
    });

    console.log('Connected to Cloudinary successfully.');
};