const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.createPost = async (req , res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.session.name, 
    reading_time: req.body.reading_time
  });
  await post.save();
  const email = req.session.email
  const userPosts = await User.findOne( { email } ); 
  // push the blogs created  into the user.blogs array 
  userPosts.posts.push(post); 
  res.json(blog);
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