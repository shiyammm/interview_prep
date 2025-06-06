// Create a new session and linked questions

import Question from "../models/Question.js";
import Session from "../models/Session.js";

// POST /api/sessions/create
export const createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } =
            req.body;

        if (!role || !experience || !topicsToFocus) {
            return res.status(401).json({
                success: false,
                message:
                    "Role, Experience and topics to focus files should not be empty"
            });
        }

        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description
        });

        if (questions) {
            const questionDocs = await Promise.all(
                questions.map(async (q) => {
                    const question = await Question.create({
                        session: session._id,
                        question: q.question,
                        answer: q.answer
                    });

                    return question._id;
                })
            );
            // Access question using question id
            session.questions = questionDocs;
        }
        await session.save();

        res.status(201).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get all sessions for the logged-in user
// Get /api/sessions/my-sessions
export const getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id })
            .sort({
                createdAt: -1
            })
            .populate("questions");
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get a session by ID with populated questions
// Get /api/sessions/:id
export const getMySessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: "questions",
                options: { sort: { isPinned: -1, createdAt: -1 } }
            })
            .exec();

        if (!session) {
            return res
                .status(404)
                .json({ success: false, message: "Session not found" });
        }

        res.status(200).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete a session and it's questions
// Delete /api/sessions/:id
export const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (session.user.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ message: "Not authorized to delete  this session" });
        }
        // Delete all questions linked to this session
        await Question.deleteMany({ session: session._id });

        // Delete the session
        await Session.deleteOne(session._id);

        res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
