import { Router } from "express";
import {
    getUserProfile,
    loginUser,
    registerUser
} from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";
import uploadMiddleware from "../middlewares/uploadMiddeware.js";
const authRoutes = Router();

authRoutes.post(
    "/register",
    upload.single("image"),
    uploadMiddleware,
    registerUser
);
authRoutes.post("/login", loginUser);
authRoutes.get("/profile", protect, getUserProfile);

export default authRoutes;
