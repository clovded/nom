import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: String,
    lat: { type: String, required: true },
    lon: { type: String, required: true },
    address: mongoose.Schema.Types.Mixed,
    osm_data: mongoose.Schema.Types.Mixed
}, { timestamps: true });

export default mongoose.model('Location', locationSchema);
