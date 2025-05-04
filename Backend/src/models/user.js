import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  currency: { type: String, default: "USD" },
  notifications: { type: String, default: "enabled" },
  whatsappNumber: { type: String, default: "" },
  whatsappConnected: { type: Boolean, default: false }
}, { _id: false });

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, min: 2, max: 32 },
        email: { type: String, required: true, unique: true },
        password: { 
            type: String, 
            required: function () { return !this.googleId; }
        },
        googleId: { type: String, unique: true, sparse: true }, 
        profilePic: { type: String },
        settings: { type: settingsSchema, default: () => ({}) },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Users", userSchema);
