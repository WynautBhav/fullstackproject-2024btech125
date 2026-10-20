import mongoose from 'mongoose';

export async function connectDB(uri) {
  if (!uri) {
    console.warn('⚠  MONGO_URI not set — contact form submissions will fail.');
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log('✓ MongoDB connected');
  } catch (err) {
    console.error('✗ MongoDB connection error:', err.message);
  }
}
