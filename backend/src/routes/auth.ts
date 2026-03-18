import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// register
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
        res.status(400).json({
            message: "Username already exists"
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username, password: hashedPassword
    });
    await user.save();

    res.status(201).json({ message: "User registered" });
});

// login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        res.status(400).json({
            message: "Username doesn't exist"
        });
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        res.status(400).json({ message: "Invalid password" });
        return;
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" });
    res.json({
        token, // for frontend
        user: { id: user._id, username: user.username }
    });
});

// logout
// frontend has to delete the token from login 
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out" });
});


export default router;
