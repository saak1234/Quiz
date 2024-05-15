const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
const QuizQuestionSchema = new mongoose.Schema({
  question: {
      type: String,
      required: true,
  },
  options: {
      type:[String],
      required: true,
  },
  answer: {
      type: Number,
      required: true,
  },
});

const QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number
  }]
});

const User = mongoose.model('User', userSchema);
const QuizQuestion = mongoose.model('QuizQuestion', QuizQuestionSchema);
const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = {User,QuizQuestion,Quiz};
