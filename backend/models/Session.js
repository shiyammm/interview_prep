import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    description: { type: String },
    topicsToFocus: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});

const Session =
    mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
