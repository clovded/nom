import { Router } from 'express';
import Location from '../models/Location.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/find-or-create', authenticate, async (req, res) => {
    try {
        const { name, type, lat, lon, address, osm_data } = req.body;

        let location = await Location.findOne({ lat, lon });

        if (location) {
            if (location.name !== name) {
                location = await Location.create({ name, type, lat, lon, address, osm_data });
            }
        } else {
            location = await Location.create({ name, type, lat, lon, address, osm_data });
        }

        res.json(location);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
