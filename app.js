var createError = require("http-errors");
const mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");

var app = express();

mongoose
  .connect(
    "mongodb+srv://quancanhai:hoangquan123@cluster0.m5rmad6.mongodb.net/hoangquan"
  )
  .then(() => console.log("Connected MongoDB"))
  .catch((err) => console.error("Error Connect: ", err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(function (_, res, next) {
  res.render("error", {
    error: {
      message: "404 Not Found",
      status: 404,
    },
  });
});

app.use(function (err, req, res, _) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
