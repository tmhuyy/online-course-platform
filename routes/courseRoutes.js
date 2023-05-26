const express = require("express");
const router = express.Router();
const { renderCourseList, renderAllCourses } = require("../controllers/courseController");

router.get("/courses/type", renderAllCourses)
router.get("/courses/type/:catergory", renderCourseList);

module.exports = router;
