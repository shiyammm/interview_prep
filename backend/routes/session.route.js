import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import { createSession } from "../controllers/sessionController.js";

const sessionRoutes = Router();

sessionRoutes.post("/create", protect, createSession);

export default sessionRoutes;
