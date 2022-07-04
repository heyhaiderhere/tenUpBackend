import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const connectDb = asyncHandler(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `connection esteblished on host: ${conn.connection.host}`.white.bgCyan
        .bold
    );
  } catch (error) {
    console.error(`Error accoured ${error.message}`.bgRed.bold);
  }
});

export default connectDb;
