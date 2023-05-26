const User = require("./models/user");

const addNewUser = async (req, res) => {
    const user = new User({
        username: "huyhuy123",
        password: "huy123",
        email: "minhhuy123@gmail.com",
    });
    await user.save();
};
const addNewAdmin = async (req, res) => {
    const admin = new Admin({
        email: "admin123@gmail.com",
        username: "admin123",
        password: "admin123",
    });
    await admin.save();
    console.log(admin);
};



const addCourse = async (req, res) => {
    const course = new Course({
        name: "React Master",
        catergory: "Development",
        price: 120,
        level: "Beginner",
        description: "Hello helo",
    });
    await course.save();
};
// findAdmin();
