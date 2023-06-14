const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    author: { type: mongoose.Types.ObjectId, ref: 'User' , required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;