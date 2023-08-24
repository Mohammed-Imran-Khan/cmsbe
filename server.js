const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const Question = require('./models/question');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://imran:imran@cluster0.uiiuj4g.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

app.post('/api/comments', async (req, res) => {
  try {
    const newComment = new Comment({ comment: req.body.comment });
    await newComment.save();
    res.status(201).send('Comment submitted successfully.');
  } catch (error) {
    res.status(500).send('Error submitting comment.');
  }
});

app.get('/api/comments/pending', async (req, res) => {
  try {
    const comments = await Comment.find({ approved: false });
    res.json(comments);
  } catch (error) {
    res.status(500).send('Error fetching pending comments.');
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to My CMS App!</h1>');
});

app.patch('/api/comments/:id', async (req, res) => {
  try {
    const { approved, adminReply } = req.body;
    let updateData = { approved: approved };
    if (adminReply) {
      updateData.adminReply = adminReply;
    }
    await Comment.findByIdAndUpdate(req.params.id, updateData);
    res.status(200).send('Comment approved successfully.');
  } catch (error) {
    res.status(500).send('Error approving comment.');
  }
});

app.patch('/api/question', async (req, res) => {
  try {
    const { question } = req.body;
    await Question.findOneAndUpdate({}, { question }, { upsert: true });
    res.status(200).send('Question updated successfully.');
  } catch (error) {
    res.status(500).send('Error updating question.');
  }
});

app.get('/api/question', async (req, res) => {
  try {
    const questionData = await Question.findOne();
    res.json(questionData);
  } catch (error) {
    res.status(500).send('Error fetching question.');
  }
});


app.delete('/api/comments/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).send('Comment deleted successfully.');
  } catch (error) {
    res.status(500).send('Error deleting comment.');
  }
});

app.get('/api/comments/approved', async (req, res) => {
  try {
    const comments = await Comment.find({ approved: true });
    res.json(comments);
  } catch (error) {
    res.status(500).send('Error fetching approved comments.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
