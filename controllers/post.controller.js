const Post = require("../models/Post");
// Primary CRUD for posts

exports.getPost = async (req, res) => {
  await Post.findOne({ _id: req.params.id })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(404).json({ message: err.message }));
};
exports.getPosts = async (req, res) => {
  await Post.find({ userId: req?.params?.id })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(404).json({ message: err.message }));
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
  Post.create(post)
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(404).json({ message: err.message }));
};

exports.updatePost = async (req, res) => {
  Post.updateOne({ _id: req.params.id }).exec(function (err, result) {
    res.status(200).send(result);
    if (err) {
      return err;
    }
  });
};
exports.deletePost = async (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(404).json({ message: err.message }));
};

exports.deleteManyposts = async (req, res) => {
  const arrOfIds = req.body;
  const Post = await Post.deleteMany(arrOfIds[0])
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(404).json({ message: err.message }));
};

// Categories CRUD
