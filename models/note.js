const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  approved: Boolean,
});

module.exports = mongoose.model('Note', noteSchema);
