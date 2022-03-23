const Post = require("../models/Post");
const User = require("../models/users");
// Primary CRUD for posts

exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({ _id: id });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.getAllUserPosts = async (req, res) => {
  const id = req.params.id;
  try {
    Post.find({ _id: id }).then(function (posts) {
      res.status(200).json(posts);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.createPost = async (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.body,
  };
  // Check for duplicate post title //
  const postHistory = await Post.findOne({ title: post.title });
  if (!postHistory) {
    try {
      Post.create(post, function (err, Post) {
        res.status(200).json(Post);
      });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  } else {
    res.send("this title is a duplicate, please rethink of one");
  }
};

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    Post.updateOne({ _id: id }, req.body, function (err, result) {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    Post.deleteOne({ _id: id }, function (err, result) {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// posts Mass CRUD operations

exports.getAllPosts = async (req, res) => {
  try {
    Post.find({}).then(function (posts) {
      res.send(posts);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.deleteManyposts = async (req, res) => {
  const arrOfIds = req.body;
  try {
    const Post = await Post.deleteMany(arrOfIds[0]);
    res.status(200).json(Post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Categories CRUD
