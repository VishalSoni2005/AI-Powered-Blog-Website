import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Bloging-Website');

    console.log('✅ Database Connected Successfully');
  } catch (error) {
    console.error('❌ Database Connection Failed:', error.message);

    // Optional: Retry Connection After Delay
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

export default connectDB;
