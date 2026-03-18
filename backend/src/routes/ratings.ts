import { Router } from "express";

const router = Router();

// create rating
router.post("/", (req, res) => {
    // create rating logic here
    res.send("Rating created");
});

// delete rating
router.delete("/:id", (req, res) => {
    // delete rating logic here
    res.send("Rating deleted");
});

// get one rating
router.get("/:id", (req, res) => {
    // get one rating logic here
    res.send("Rating retrieved");
});

// get all ratings
router.get("/", (req, res) => {
    // get all ratings logic here
    res.send("All ratings retrieved");
});

export default router;

