import mongoose from "mongoose";

const connectToDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to DB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
        process.exit(1);
    }
};

export default connectToDB;
