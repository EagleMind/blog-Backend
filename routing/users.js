const User = require('../controllers/user.controller');
const express = require("express");
const router = express.Router();


    router.post('/register', User.registration);
    router.post('/login',User.login);

module.exports = router;
