const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: {
        type: String,
        required: [true, "Body must be entered"],
    },
    rating: {
        type: Number,
        required: [true, "Rating must be entered"],
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
