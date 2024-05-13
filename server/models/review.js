const mongoose = require("mongoose");

// Define the schema for the review model
const reviewSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

// Create and export the Review model
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
