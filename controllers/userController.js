const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
    res.render("register");
};

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body.user;
        const user = new User({ email, username, password });
        await user.save();
        req.flash("success", "Register successfully");
        res.redirect("/login");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("login");
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findAndValidate(username, password);
    if (user) {
        req.session.user = user;
        req.flash("success", "Welcome back to Eduboard");
        const redirectUrl = req.session.returnTo || "/";
        res.redirect(redirectUrl);
    } else {
        req.flash("error", "Password or Username is wrong");
        res.redirect("/login");
    }
};

module.exports.logout = (req, res, next) => {
    req.session.user = null;
    req.flash("success", "Log out successfully");
    res.redirect("/");
};
