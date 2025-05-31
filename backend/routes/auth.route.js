import { Router } from "express";
import {
    getUserProfile,
    loginUser,
    registerUser
} from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddeware.js";

const authRoutes = Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/profile", protect, getUserProfile);

authRoutes.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({ imageUrl });
});

export default authRoutes;
