import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    nextPaymentDate: { type: Date, required: true },
    color: { type: String, default: "#6366f1" },
    category: { type: String, required: true },
    billingCycle: { type: String, required: true },
    description: { type: String },
    notes: { type: String },
    paymentMethod: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
