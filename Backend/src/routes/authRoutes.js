import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken"; 
import { userLogin, userSignUp, refreshToken, logout } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import Users from "../models/user.js"; 

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.post("/refresh-token", refreshToken);
router.get("/protected", verifyToken, (req, res) => res.send("Protected data"));

// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
      // Generate JWT for the user
      const user = req.user;
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRY || "1h" }
      );
      // Redirect to frontend with token in query
      res.redirect(`http://localhost:5173/login?token=${accessToken}`);
  }
);

// Get user session route (JSON response for API)
router.get("/user", async (req, res) => {
  // If req.user is a user object (from session), return it
  if (req.user && req.user.username) {
    return res.json({ user: req.user });
  }
  // If req.user is a JWT decoded object (from token), fetch user from DB
  let userId = req.user?.userId || req.user?._id;
  if (userId) {
    try {
      const user = await Users.findById(userId).select("username email _id");
      if (user) {
        return res.json({ user });
      }
    } catch (e) {
      return res.status(500).json({ message: "Failed to fetch user" });
    }
  }
  return res.status(401).json({ message: "Unauthorized" });
});

router.get("/login/failed", (req, res) => {
  return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in.",
  });
});

export default router;
