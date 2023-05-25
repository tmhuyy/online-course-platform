const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const CourseSchema = new Schema({
    subjectID: {
        type: String,
        unique: true,
        required: true,
    },

    name: {
        type: String,
        unique: true,
        required: true,
    },

    price: {
        type: Number,
        min: [0, "Price must be greater than or equal to 0"],
        required: [true, "Price must be entered"],
    },

    description: {
        type: String,
        required: [true, "Description must be entered"],
    },

    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

CourseSchema.post("findOneAndDelete", async function (course) {
    if (course.reviews.length) {
        await Review.deleteMany({ _id: { $in: course.reviews } });
    }
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
