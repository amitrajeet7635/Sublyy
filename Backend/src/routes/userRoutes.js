import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getUserSettings, updateUserSettings } from "../controllers/userController.js";

const router = express.Router();

router.get("/settings", verifyToken, getUserSettings);
router.put("/settings", verifyToken, updateUserSettings);

export default router;
