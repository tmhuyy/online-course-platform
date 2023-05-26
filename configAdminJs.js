const AdminJS = require("adminjs");
const AdminJSMongoose = require("@adminjs/mongoose");
// import model
const User = require("./models/user");
const Admin = require("./models/admin");
const Course = require("./models/course");
const Review = require("./models/review");
// import resources
const AdminResource = require("./configAdminResource/AdminResource");
const UserResource = require("./configAdminResource/UserResource");
const CourseResource = require("./configAdminResource/CourseResource");
const ReviewResource = require("./configAdminResource/ReviewResource");

const { ValidationError } = require("adminjs");

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
    resources: [AdminResource, UserResource, CourseResource, ReviewResource],
    databases: [],
});

module.exports = adminJs;
