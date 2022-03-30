const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Profile = new schema({
  name: { type: String },
  profile_pic: { type: String },
  bio: { type: String },
  job_title: { type: String },
  social_media: [
    { name: "Linkedin", link: String },
    { name: "Behance", link: String },
    { name: "Artstation", link: String },
  ],
  posts: [{ postId: String }],
  following: [{ profileId: String }],
});

module.exports = ProfileModel = mongoose.model("profile", Profile);
