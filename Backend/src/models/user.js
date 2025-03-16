import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {type:String, required: true, min: 2, max: 32},
        email: {type:String, required: true, unique:true},
        password: {type: String, required: true},
    },
    {
         timestamps:true 
    }
);

export default mongoose.model("Users", userSchema)