import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
});

export default mongoose.model("Location", locationSchema);