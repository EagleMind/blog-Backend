const Post = require("../controllers/Post.controller");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/verifyAuth");

// Primary CRUD routes

router.get("/getPost/:id", auth, Post.getPost);
router.post("/createPost", auth, Post.createPost);
router.put("/updatePost/:id", auth, Post.updatePost);
router.delete("/deletePost/:id", auth, Post.deletePost);

// MultiFunctionality CRUD operations

router.get("/getAllPosts", auth, Post.getAllPosts);
router.get("/getAllUserPosts/:id", auth, Post.getAllUserPosts);
router.post("/deleteManyposts", auth, Post.deleteManyposts);

module.exports = router;
