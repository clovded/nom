import { Router } from "express";

const router = Router();

// find
router.get("/", (req, res) => {
    // find locations logic here
    res.send("Locations found");
});

export default router;
