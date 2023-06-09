const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    reading_time: {
      type: String,
      select: true,
    },
},
{
  timestamps: true,
},
);
postSchema.virtual('url').get(function(){
  return '/post/' + this._id
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;