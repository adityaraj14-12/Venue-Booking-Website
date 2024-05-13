const express = require("express");
const router = express.Router();
const Review = require("../models/review"); // Import the Review model
router.post("/add", async (req, res) => {
    try {
        // Extract data from the request body
        const { roomId, rating, review } = req.body;

        // Create a new review instance
        const newReview = new Review({
            roomId,  // Include roomId
            rating,
            review
        });

        // Save the new review to the database
        await newReview.save();

        // Respond with success message
        res.json({ success: true, message: "Review added successfully" });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ success: false, message: "Failed to add review" });
    }
});

// Route to fetch user reviews based on room ID
router.get("/:roomId/user", async (req, res) => {
    try {
        // Extract roomId from the request parameters
        const { roomId } = req.params;

        // Find all reviews associated with the specified roomId
        const reviews = await Review.find({ roomId });

        // Respond with the reviews
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching user reviews:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user reviews" });
    }
});

module.exports = router;
