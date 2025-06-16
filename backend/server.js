import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectToDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import sessionRoutes from "./routes/session.route.js";
import questionRoutes from "./routes/question.route.js";
import protect from "./middlewares/authMiddleware.js";
import {
    generateConceptExplanation,
    generateInterviewQuestions
} from "./controllers/aiController.js";
import connectToCloudinary from "./config/cloudinary.js";

dotenv.config({ path: ".env.local" });

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to DB
await connectToDB();
await connectToCloudinary();

const allowedDomains = [
    "http://localhost:5173",
    "https://interview-prep-ym3y.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedDomains.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to the interview prep API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Server Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server running in http://localhost:${port}`);
});
