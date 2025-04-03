import express from "express";
import passport from "passport";
import { userLogin, userSignUp, refreshToken, logout } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

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
      // Redirect to the frontend with user info
      res.redirect(`http://localhost:5173/dashboard`);
  }
);



// Get user session route (JSON response for API)
router.get("/user", (req, res) => {
  console.log("Session user:", req.user);  // Debugging log
  if (req.user) {
      return res.json({ user: req.user });
  } else {
      return res.status(401).json({ message: "Unauthorized" });
  }
});

router.get("/login/failed", (req, res) => {
  return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in.",
  });
});

export default router;
