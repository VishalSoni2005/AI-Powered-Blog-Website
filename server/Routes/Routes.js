import express from 'express';
import { signup, signin, googleAuth } from '../Controller/AuthController.js';

const router = express.Router();

// Auth routes
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google-auth', googleAuth);


export default router;
