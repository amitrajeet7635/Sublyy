import express from "express";
import { addSubscription, getSubscriptions, getSubscriptionAnalytics } from "../controllers/subscriptionController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";  // Updated path to use the correct middleware

const router = express.Router();

// All routes require authentication
router.use(verifyToken);  // Changed from authenticateUser to verifyToken

// Subscription endpoints
router.post("/", addSubscription);
router.get("/", getSubscriptions);
router.get("/analytics", getSubscriptionAnalytics);

export default router;
