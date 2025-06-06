import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import {
    createSession,
    deleteSession,
    getMySessionById,
    getMySessions
} from "../controllers/sessionController.js";

const sessionRoutes = Router();

sessionRoutes.post("/create", protect, createSession);
sessionRoutes.get("/my-sessions", protect, getMySessions);
sessionRoutes.get("/:id", protect, getMySessionById);
sessionRoutes.delete("/:id", protect, deleteSession);

export default sessionRoutes;
