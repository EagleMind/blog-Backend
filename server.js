const express = require("express");
const path = require("path");
const connect = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("./controllers/user.controller");
const compression = require("compression");
const posts = require("./routing/posts");
var jwt = require("jsonwebtoken");
connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Connect to database
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

//call heros routing
// Using compression in the middleware will help decrease requests body response size therefore makes the app faster
app.use(compression());
// Listening obviously
app.listen(4000, function () {
  console.log("listening on 4000");
});
// Controllers routings
app.use("/posts", posts);
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});
app.post("/register", userController.registration);
app.post("/login", userController.login);
