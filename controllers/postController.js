const Post = require('../models/post');
const User = require('../models/user');
const Objectid = require('mongodb').ObjectId;


exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.createPost = async (req , res) => {
  const id  = {"_id": new Objectid(req.user._id.trim())}
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: id, 
    reading_time: req.body.reading_time
  });
 
  await post.save();
  //add post yo user posts array
  await User.findOneAndUpdate(
    { _id: id },
    { $push: { posts: post } },
  )

  res.json(post);
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};