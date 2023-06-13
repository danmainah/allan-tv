const Post = require('../models/post');
const User = require('../models/user');
const ObjectID = require('mongodb').ObjectId;

exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.createPost = async (req , res) => {
  console.log(req.user)
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user._id, 
    reading_time: req.body.reading_time
  });
 
  await post.save();
  const user = await  User.findByIdAndUpdate({'_id': new ObjectID(req.user._id)} , {
    $push: {
        posts: {
            post
          }
          }
      }); 
  // push the posts created  into the user.posts array 
  user.posts.push(post); 
  res.json(post);
  console.log(user)
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