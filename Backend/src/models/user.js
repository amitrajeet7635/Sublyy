import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, min: 2, max: 32 },
        email: { type: String, required: true, unique: true },
        password: { 
            type: String, 
            required: function () { return !this.googleId; } // Required only if Google ID is not present
        },

        // Google OAuth Fields
        googleId: { type: String, unique: true, sparse: true }, 
        profilePic: { type: String }, // Store Google profile picture
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Users", userSchema);
