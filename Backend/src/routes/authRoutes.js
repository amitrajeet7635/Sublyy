import express from "express";
import passport from "passport";
import { userLogin, userSignUp, refreshToken, logout } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.get("/protected", verifyToken, (req, res) => res.send("Protected data"));

// Google Auth Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Auth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/auth?error=login_failed" }),
  (req, res) => {
    const token = req.user.accessToken; // Assuming `accessToken` is generated in the strategy
    res.redirect(`http://localhost:5173/auth?token=${token}`);
  }
);

export default router;
