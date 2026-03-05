import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import Rating from '../models/Rating.js';
import { authenticate } from '../middleware/auth.js';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();

router.get('/', async (req, res) => {
    try {
        const ratings = await Rating.find()
            .sort('-createdAt')
            .populate('user', 'username email')
            .populate('location', 'name lat lon');
        res.json(ratings);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', authenticate, upload.array('images', 10), async (req, res) => {
    try {
        const { location, taste, ambiance, foodComa, service, noise, creativity, comment } = req.body;
        const images = req.files?.map(f => f.filename) || [];

        const rating = await Rating.create({
            location,
            user: req.user._id,
            taste: Number(taste) || 0,
            ambiance: Number(ambiance) || 0,
            foodComa: Number(foodComa) || 0,
            service: Number(service) || 0,
            noise: Number(noise) || 0,
            creativity: Number(creativity) || 0,
            images,
            comment: comment || ''
        });

        await rating.populate('user', 'username email');
        await rating.populate('location', 'name lat lon');

        res.status(201).json(rating);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
