import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taste: { type: Number, default: 0 },
    ambiance: { type: Number, default: 0 },
    foodComa: { type: Number, default: 0 },
    service: { type: Number, default: 0 },
    noise: { type: Number, default: 0 },
    creativity: { type: Number, default: 0 },
    images: [String],
    comment: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Rating', ratingSchema);
