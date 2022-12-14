var createError = require("http-errors");
var express = require("express");
const DeviceDetector = require("device-detector-js");
require("dotenv").config();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var smsSend = require("./routes/notification");
var posts = require("./routes/post");
const { log } = require("debug");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/send-sms", smsSend);
app.use("/get-post", posts);

app.use("/hello", (req, res, next) => {
  const headerInfo = req.headers["user-agent"];
  const deviceDetector = new DeviceDetector();
  const userAgent = headerInfo;
  const device = deviceDetector.parse(userAgent);
  res.json({
    message: "Hi,Hello",
    data: device,
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
