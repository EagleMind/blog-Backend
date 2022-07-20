const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const profile = require("../models/profile");
const User = require("../models/users");
require("dotenv").config();

exports.registration = async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(201).json({ error: "user already exist" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const createUser = new User({
            email: email,
            password: hash,
          });
          createUser
            .save()
            .then(() => {
              return res.send({
                success: "Welcome to rentWall, Please Sign in!",
              });
            })
            .catch((err) => {
              res.send(err);
            });
        });
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    !user
      ? res.status(404).json({ msg: "Email does not exist, please verify!" })
      : bcrypt.compare(password, user.password).then((isMatched) => {
          if (isMatched) {
            const payload = { id: user.id, email: user.email };
            jwt.sign(
              payload,
              process.env.secretkey,
              { expiresIn: 999999 },
              (err, token) => {
                if (err) throw err;
                res.status(200).json({ token: token, id: user._id });
              }
            );
          } else {
            return res.status(401).json({ msg: "password incorrect" });
          }
        });
  });
};
