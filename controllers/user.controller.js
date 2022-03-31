const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const profile = require("../models/profile");
const User = require("../models/users");
require("dotenv").config();

exports.registration = (req, res) => {
  const { email, password, name, job_title } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.json({ msg: "user already exist" });
    } else {
      const createUser = new User({ email, password });
      const profilesAttributes = new profile({ email, name, job_title });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(createUser.password, salt, (err, hash) => {
          createUser.password = hash;
          createUser.save().then((user) =>
            profilesAttributes
              .save()
              .then((profile) => res.send([user, profile]))
              .catch((err) => {
                res.send(err);
              })
          );
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
