const Course = require("../models/course");
const User = require("../models/user")
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
    const {_id} = req.session.user
    const user = await User.findById(_id).populate({ path: "courses" });
    res.render("myCourse", { courses:  user.courses })
}

module.exports.renderCourseSingle = async (req, res) => {
    const { id } = req.params;
    const {user} = req.session;
    const course = await Course.findById(id);
    res.render("course/courseSingle", {course, isBought: user?.courses.includes(id)})
}

module.exports.buyCourse = async (req, res) => {
    const { _id } = req.session.user;
    const courseId = req.params.id;
    const user = await User.findByIdAndUpdate(_id);
    const course = await Course.findById(courseId)
    if (user.money < course.price) {
        req.flash("error", "You do not have enough IU Coins");
        res.redirect(`/`)
    } else {
        if (user.courses.includes(courseId)) {
            req.flash("error", "You already have that course");
            res.redirect(`/`)
        } else {
            user.courses.push(courseId);
            const updatedCourse = await Course.findByIdAndUpdate(courseId);
            updatedCourse.users.push(_id);
            user.money -= course.price
            await user.save();
            await updatedCourse.save()
            req.session.user = user;
            req.flash("success", "Buy Successfully");
            res.redirect(`/`)
        }
    }
    
    
}