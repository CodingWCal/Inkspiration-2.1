const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Add a console.log for debugging
    console.log("MONGO_URI:", process.env.MONGO_URI);

     // Error out early if MONGO_URI isn't defined
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set - Check Render Environment Variables.");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
