const User = require("../controllers/user.controller");
const Profile = require("../controllers/profile.controller");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/verifyAuth");

router.post("/register", User.registration);
router.post("/login", User.login);

module.exports = router;
