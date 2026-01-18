const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI not set. Skipping MongoDB connection (development mode).');
    return;
  }
  // If MONGODB_URI is present but looks like a placeholder, skip connection
  if (!/^mongodb(\+srv)?:\/\//i.test(process.env.MONGODB_URI)) {
    console.warn('MONGODB_URI does not appear to be a valid MongoDB connection string. Skipping connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser / useUnifiedTopology not required in Mongoose v6+
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Do not exit the process here during development; rethrow so callers can decide.
    throw error;
  }
};

module.exports = connectDB;
