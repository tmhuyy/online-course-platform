const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateUser } = require("../utils/validateModel");
const catchAsync = require("../utils/catchAsync");

router
    .route("/register")
    .get(userController.renderRegisterForm)
    .post(validateUser, catchAsync(userController.registerUser));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(userController.login);

router.post("/logout", userController.logout);

module.exports = router;