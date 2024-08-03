require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const cloudianry = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

cloudianry.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// error handler imports
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const productRouter = require("./routes/productRoutes");

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

// Routes
app.use("/api/v1/products", productRouter);

// Global Errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
