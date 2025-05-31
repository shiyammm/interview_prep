import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectToDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import sessionRoutes from "./routes/session.route.js";

dotenv.config({ path: ".env.local" });

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to DB
await connectToDB();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to the interview prep API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);

// Server Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server running in http://localhost:${port}`);
});
