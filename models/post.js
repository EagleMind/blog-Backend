const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Post = new schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
});

module.exports = PostModel = mongoose.model('Post', Post);;
