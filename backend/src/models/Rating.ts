import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    taste: { type: Number, required: true },
    ambiance: { type: Number, required: true },
    foodComa: { type: Number, required: true },
    service: { type: Number, required: true },
    noise: { type: Number, required: true },
    creativity: { type: Number, required: true },
    images: [{ type: String }],
    comment: { type: String },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Rating", ratingSchema);