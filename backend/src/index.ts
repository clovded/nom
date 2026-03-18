import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import ratingsRoutes from "./routes/ratings.js";
import locationsRoutes from "./routes/locations.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/locations", locationsRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(8080, () => console.log("Server is running on port 8080"));
    })
    .catch((err) => console.error("MongoDB connection error:", err));