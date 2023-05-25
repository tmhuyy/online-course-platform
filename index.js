"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");

const engine = require("ejs-mate");
const path = require("path");
const bodyParser = require("body-parser");
const AdminJSExpress = require("@adminjs/express");

// const AppError = require("./utils/AppError");

const app = express();

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const mongoDB = process.env.DB_URL;
mongoose
  .connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("CONNECTION MONGODB"))
    .catch((err) => console.log(err));
  
const store = MongoStore.create({
  mongoUrl: mongoDB,
  secret: process.env.SESSION_SECRET,
  touchAfter: 24 * 3600,
});

const configSession = {
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
  store,
};
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(session(configSession));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // res.locals.student = req.session.student;
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.all("*", (req, res, next) => {
  next(new AppError("PAGE NOT FOUND", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong", name } = err;
  res.render("error", { status, message, name });
});

app.listen(process.env.PORT, () => {
  console.log("Sever is running");
});
