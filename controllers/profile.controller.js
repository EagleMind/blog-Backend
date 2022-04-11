const Profile = require("../models/profile");

exports.update = async (req, res) => {
  const profile = {
    email: req.body.email,
    name: req.body.name,
    profile_pic: req.body.profile_pic,
    bio: req.body.bio,
    job_title: req.body.job_title,
    social_networks: { linkedin: req.body.social_networks.linkedin },
    user_posts: req.body.user_posts,
    followingIds: req.body.followingIds,
  };

  await Profile.updateOne({ email: req.userData.email }, profile).exec(
    function (err, result) {
      res.send(profile);
      if (err) {
        return err;
      }
    }
  );
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
  Profile.find({ email: req.userData.email })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(404).json({ message: err.message }));
};
