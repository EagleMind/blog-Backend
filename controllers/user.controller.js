const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();

exports.registration = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.json({ msg: "user already exist" });
    } else {
      const createUser = new User({ email, password });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(createUser.password, salt, (err, hash) => {
          createUser.password = hash;
          createUser
            .save()
            .then((user) => res.send(user))
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
  console.log(req.body);
  User.findOne({ email }).then((user) => {
    console.log(user);
    if (!user) {
      return res.json({ msg: "email not exist" });
    } else {
      bcrypt.compare(password, user.password).then((isMatched) => {
        if (isMatched) {
          const payload = { id: user.id, email: user.email };
          jwt.sign(
            JSON.stringify(payload),
            process.env.secretkey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({ token: "Bearer " + token, id: user._id });
            }
          );
        } else {
          return res.json({ msg: "password incorrect" });
        }
      });
    }
  });
};
