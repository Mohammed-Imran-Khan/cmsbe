const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  approved: { type: Boolean, default: false },
  adminReply: { type: String },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
