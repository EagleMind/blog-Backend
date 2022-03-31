const Profile = require("../controllers/profile.controller");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/verifyAuth");

router.put("/me/update", auth, Profile.update);
router.get("/me", auth, Profile.me);
router.post("/me/create", auth, Profile.create);
module.exports = router;
