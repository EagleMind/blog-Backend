const mongoose = require("mongoose");
const schema = mongoose.Schema;
const social_medias = new schema({ linkedin: { type: String } });
const Profile = new schema(
  {
    userId: { type: String },
    email: { type: String, unique: true },
    name: { type: String },
    profile_pic: { type: String },
    bio: { type: String },
    job_title: { type: String },
    user_posts: [{ type: String }],
    followingIds: [{ type: String }],
    social_networks: [social_medias],
  },
  {
    timestamps: true,
  }
);

module.exports = ProfileModel = mongoose.model("profile", Profile);
