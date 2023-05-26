const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    catergory: {
        type: String,
        required: true,
        enum: [
            "Development",
            "Marketing",
            "Design",
            "Business",
        ],
    },

    price: {
        type: Number,
        required: true,
    },

    level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Expert"],
    },

    description: {
        type: String,
        required: true,
    },

    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
