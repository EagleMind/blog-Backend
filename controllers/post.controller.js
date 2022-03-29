const Post = require("../models/Post");
const User = require("../models/users");
// Primary CRUD for posts

exports.getPost = async (req, res) => {
  const post = await Post.findOne({ _id: id })(req.body, (err) =>
    !err
      ? res.status(200).json(post)
      : res.status(404).json({ message: err.message })
  );
};
exports.getAllUserPosts = async (req, res) => {
  const posts = await Post.find({ userId: req.params.id })(req.body, (err) =>
    !err
      ? res.status(200).json(posts)
      : res.status(404).json({ message: err.message })
  );
};
exports.createPost = async (req, res) => {
  const post = {
    userId: req.userData.userId,
    title: req.body.title,
    body: req.body.body,
  };
  // Check for duplicate post title //
  const postHistory = await Post.findOne({ title: post.title }).exec();
  if (postHistory) {
    res
      .status(404)
      .json({ message: "this title is a duplicate, please rethink of one" });
    return;
  }
  Post.create(post, (err, post) =>
    !err
      ? res.status(200).json(post)
      : res.status(404).json({ message: err.message })
  );
};

exports.updatePost = async (req, res) => {
  Post.updateOne({ _id: req.params.id });
};
exports.deletePost = async (req, res) => {
  Post.deleteOne({ _id: req.params.id })(req.body, (err) =>
    !err
      ? res.status(200).json(result)
      : res.status(404).json({ message: err.message })
  );
};

// posts Mass CRUD operations

exports.getAllPosts = async (req, res) => {
  Post.find({})(req.body, (err) =>
    !err
      ? res.status(200).json(result)
      : res.status(404).json({ message: err.message })
  );
};
exports.deleteManyposts = async (req, res) => {
  const arrOfIds = req.body;
  const Post = await Post.deleteMany(arrOfIds[0])(req.body, (err) =>
    !err
      ? res.status(200).json(result)
      : res.status(404).json({ message: err.message })
  );
};

// Categories CRUD
