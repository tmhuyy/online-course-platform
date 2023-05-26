const Course = require("../models/course");

module.exports.renderAllCourses = async (req, res) => {
    
    const courses = await Course.find();
    res.render("course/courseList", { courses, currentPath: req.originalUrl});
};

module.exports.renderCourseList = async (req, res) => {
    const { catergory } = req.params;
    
    const [firstLetter, ...others] = catergory;
    const upperCatergory = [firstLetter.toUpperCase(), ...others].join("");
    const courses = await Course.find({ catergory: upperCatergory });
    res.render("course/courseList", { courses, currentPath: req.originalUrl, upperCatergory});
};

module.exports.renderMyCourseList = async (req, res) => {
    res.send(req.user)
}