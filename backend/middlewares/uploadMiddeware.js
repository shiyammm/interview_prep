import { v2 as cloudinary } from "cloudinary";

const uploadMiddleware = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const image = req.file;
    const imageUrl = await cloudinary.uploader
        .upload(image.path, {
            resource_type: "image"
        })
        .then((result) => {
            return result.secure_url;
        });
    req.profileImageUrl = imageUrl;
    next();
};

export default uploadMiddleware;
