const express = require("express");
const router = express.Router();
const {
    renderCourseList,
    renderAllCourses,
    renderMyCourseList,
    renderCourseSingle,
    buyCourse
} = require("../controllers/courseController");

router.get("/courses/type", renderAllCourses);
router.get("/courses/type/:catergory", renderCourseList);
router.get("/my-courses", renderMyCourseList);
router.get("/courses/:id", renderCourseSingle);
router.get("/buy/:id", buyCourse);

module.exports = router;
