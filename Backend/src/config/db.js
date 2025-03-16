import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

//Load Evironment Variables
dotenv.config()

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
   console.error("MongoDB URI is missing! Check .env file.");
   process.exit(1);
}


const connectDB = () =>{
   return mongoose.connect(mongoURI)
};

export { connectDB };