import express from "express"
import { userLogin, userSignUp, protectedRoute, refreshToken, logout } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.post("/refresh-token", refreshToken);
router.post("/logout",logout);
router.get("/protected" ,protectedRoute,verifyToken);

export default router;