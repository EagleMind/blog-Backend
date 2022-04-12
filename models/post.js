const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Post = new schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  eReadingTime: { type: Number },
});

module.exports = PostModel = mongoose.model("Post", Post);
