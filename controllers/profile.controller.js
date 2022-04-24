const Profile = require("../models/profile");
const User = require("../models/users");
const path = require("path");
const checksum = require("checksum");

exports.update = async (req, res) => {
  const profile = {
    userId: req.userData.userId,
    email: req.body.email,
    name: req.body.name,
    profile_pic: req.body.profile_pic,
    bio: req.body.bio,
    job_title: req.body.job_title,
    social_networks: { linkedin: req.body.social_networks.linkedin },
    user_posts: req.body.user_posts,
    followingIds: req.body.followingIds,
  };
  if (req.body.email !== req.userData.email) {
    res.status(400).send({ error: "Email cannot be modified for now" });
  } else {
    await Profile.updateOne({ email: req.userData.email }, profile).exec(
      function (err, result) {
        res.status(200).send(profile);
        if (err) {
          return err;
        }
      }
    );
  }
};

// exports.create = async (req, res) => {
//   const profile = {
//     email: req.body.email,
//     name: req.body.name,
//     profile_pic: req.body.profile_pic,
//     bio: req.body.bio,
//     job_title: req.body.job_title,
//     social_networks: { linkedin: req.body.social_networks.linkedin },
//     user_posts: req.body.user_posts,
//     followingIds: req.body.followingIds,
//   };
//   Profile.create(profile)
//     .then((posts) => res.status(200).json(posts))
//     .catch((err) => res.status(404).json({ message: err.message }));
// };

exports.me = async (req, res) => {
  console.log({ userId: req.userData.userId });
  Profile.findOne({ email: req.userData.email })
    .then((profile) => res.status(200).json(profile))
    .catch((err) => res.status(404).json({ message: err.message }));
};

exports.upload = async (req, res) => {
  let file;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  file = req.files.file;

  // Generate hash for images file names to avoid duplicates/conflicts

  const hash = checksum(file.name);

  const ext = path.extname(file.name);

  uploadPath = "./assets/profile/images/" + hash + ext;

  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded!");
  });
};
