// var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fileUpload = require("express-fileupload");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var categoryRouter = require("./routes/category");
var paymentRouter = require("./routes/payment");
var productRouter = require("./routes/product");
var addressRouter = require("./routes/address");
var detailOrderRouter = require("./routes/detailorder");
var shipmentRouter = require("./routes/shipment");
var orderRouter = require("./routes/order");
var authRouter = require("./routes/auth");
var app = express();

// cors
app.use(cors());

// express file upload
app.use(fileUpload());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", usersRouter);
app.use("/category", categoryRouter);
app.use("/payment", paymentRouter);
app.use("/product", productRouter);
app.use("/address", addressRouter);
app.use("/detailorder", detailOrderRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/shipment", shipmentRouter);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  // next(createError(404));
  res.json(
    {
      status: false,
      error: err.message,
    },
    404
  );
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
