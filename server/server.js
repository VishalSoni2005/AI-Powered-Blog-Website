import express from 'express';
import 'dotenv/config';
import connectDB from './config/database.js';
import routes from './Routes/Routes.js';
import cors from 'cors';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' })); // If frontend runs on Vite


// routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
