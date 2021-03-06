const express = require("express");
const path = require("path");
const connect = require("./config/db");
const app = express();
const cors = require("cors");
const userController = require("./controllers/user.controller");
const profileController = require("./controllers/profile.controller");
const compression = require("compression");
const posts = require("./routing/posts");
const auth = require("./middleware/verifyAuth");
const profile = require("./routing/profile");
const fileUpload = require("express-fileupload");
connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Connect to database
app.use(express.json());

app.use(fileUpload());
//call heros routing
// Using compression in the middleware will help decrease requests body response size therefore makes the app faster
app.use(compression());
// Listening obviously
app.listen(4000, function () {
  console.log("listening on 4000");
});
// Controllers routings
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.post("/register", userController.registration);
app.post("/login", userController.login);
app.get("/me", auth, profileController.me);
app.patch("/me/update", auth, profileController.update);
app.use("/me/upload", auth, profileController.upload);
// app.post("/me/create", auth, profileController.create);
app.use("/posts", posts);
app.use("/me", profile);
