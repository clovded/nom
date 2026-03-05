import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password, passwordConfirm } = req.body;

        if (!username || !password || !passwordConfirm) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password !== passwordConfirm) {
            return res.status(400).json({ message: "Passwords don't match" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        const existing = await User.findOne({ username });
        if (existing) {
            return res.status(409).json({ message: 'Username already taken' });
        }

        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({ username, password: hashed });

        res.status(201).json({ id: user._id, username: user.username });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { identity, password } = req.body;

        if (!identity || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ username: identity });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, record: { id: user._id, username: user.username } });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/me', authenticate, (req, res) => {
    res.json({ id: req.user._id, username: req.user.username });
});

router.patch('/me', authenticate, async (req, res) => {
    try {
        const { currentPassword, newUsername, newPassword, newPasswordConfirm } = req.body;

        if (!currentPassword) {
            return res.status(400).json({ message: 'Current password is required' });
        }

        const user = await User.findById(req.user._id);
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const updates = {};

        if (newUsername && newUsername !== user.username) {
            const existing = await User.findOne({ username: newUsername });
            if (existing) {
                return res.status(409).json({ message: 'Username already taken' });
            }
            updates.username = newUsername;
        }

        if (newPassword) {
            if (newPassword !== newPasswordConfirm) {
                return res.status(400).json({ message: "Passwords don't match" });
            }
            if (newPassword.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters' });
            }
            updates.password = await bcrypt.hash(newPassword, 12);
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'Nothing to update' });
        }

        const updated = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        res.json({ id: updated._id, username: updated.username });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
