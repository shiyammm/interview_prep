import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import {
    addQuestionToSession,
    togglePinQuestion,
    updateQuestionNote
} from "../controllers/questionController.js";

const questionRoutes = Router();

questionRoutes.post("/add", protect, addQuestionToSession);
questionRoutes.post("/:id/pin", protect, togglePinQuestion);
questionRoutes.post("/:id/note", protect, updateQuestionNote);

export default questionRoutes;
