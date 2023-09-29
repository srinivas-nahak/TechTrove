import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;

// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => console.log("Connected to the database..."))
//   .catch((err) => console.log(err.message));
