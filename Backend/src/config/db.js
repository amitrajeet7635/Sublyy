import mongoose from "mongoose";
import dotenv from "dotenv";

// Load Environment Variables
dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
   console.error("MongoDB URI is missing! Check .env file.");
   process.exit(1);
}

const connectDB = async () => {
   try {
      // Remove deprecated options and simplify connection parameters
      console.log("Attempting to connect to MongoDB...");
      
      // Try to connect with minimal options first
      await mongoose.connect(mongoURI);
      
      console.log("MongoDB connected successfully!");
      return mongoose.connection;
   } catch (error) {
      console.error("MongoDB connection error:", error);
      
      if (error.name === 'MongoNetworkError') {
         console.error("Network error connecting to MongoDB.");
         console.log("Attempting fallback connection method...");
         
         try {
            // Try an alternative connection approach with different TLS settings
            const uri = mongoURI.includes('?') 
               ? `${mongoURI}&tls=true&tlsInsecure=true` 
               : `${mongoURI}?tls=true&tlsInsecure=true`;
               
            await mongoose.connect(uri);
            console.log("MongoDB connected successfully with fallback method!");
            return mongoose.connection;
         } catch (fallbackError) {
            console.error("Fallback connection also failed:", fallbackError);
            throw fallbackError;
         }
      }
      
      throw error;
   }
};

export { connectDB };