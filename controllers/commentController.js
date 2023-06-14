const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const Objectid = require('mongodb').ObjectId;

exports.getComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

exports.createComment = async (req , res) => {
  const id  = {"_id": new Objectid(req.user._id.trim())}
  const comment = new Comment({
    message: req.body.message, 
    author: id
  });

  await comment.save();
  //add comments to post
  await Post.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: comment } },
  )

  res.json(comment);
};


exports.updateComment = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: 'comment deleted' });
};