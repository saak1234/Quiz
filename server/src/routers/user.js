const express = require('express');
const info = require('../models/user.js');
const { User, QuizQuestion,Quiz } = info;
const router = express.Router()
const natural = require('natural');

router.post('/signup', async (req, res) => {
    try {
        const { email, password} = req.body;

        // Check if the email is valid
        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // Check if the user with the same email already exists
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
 
        // Create a new user without hashing the password
        const newUser = new User({
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ userId: newUser._id, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }

        // Validate the password
        const isValidPassword = user.password === password; // Replace with your validation logic

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Authentication failed: Invalid password' });
        }

        // Respond without generating a JWT token
        res.status(200).json({ userId: user._id, message: 'Authentication successful' });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/quiz-questions', async (req, res) => {
    try {
        const questions = await QuizQuestion.find();
        res.json(questions);
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/quizzes/:id/questions', async (req, res) => {
    const { id } = req.params; // The ID of the quiz to which the question will be added
    const { question, options, correctAnswer } = req.body; // Destructure the needed properties from the request body

    try {
        // Find the quiz by ID and update it by pushing the new question into its questions array
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            { $push: { questions: { question, options, correctAnswer } } }, // Push the new question object into the questions array of the quiz
            { new: true, safe: true, upsert: false } // Options for findByIdAndUpdate
        );
        console.log(updatedQuiz);
        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' }); // Return a 404 if the quiz is not found
        }

        // Send a success response with the message
        res.status(201).json({ message: 'Question added successfully', updatedQuiz });
    } catch (error) {
        console.error('Failed to add question:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle any other errors
    }
});
  router.post('/create-quiz', async (req, res) => {
    try {
      const { title, description, questions } = req.body;
      const quiz = new Quiz({
        title,
        description,
        questions
      });
      await quiz.save();
      res.status(201).json({ message: 'Quiz created successfully' });
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/quizzes', async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.status(200).json(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.get('/quizzes/:quizId/questions', async (req, res) => {
    try {
      const quizId = req.params.quizId;
      const quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
      res.status(200).json(quiz.questions);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/quizzes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Quiz.findByIdAndDelete(id);
        if (result) {
            res.status(204).send(); // No Content, successful deletion
        } else {
            res.status(404).send('Quiz not found'); // Not found if no quiz with this ID exists
        }
    } catch (error) {
        res.status(500).send('Server error'); // Server error if the deletion fails
    }
});


// router.post('/quizzes/:id/questions', async (req, res) => {
//   const { id } = req.params;
//   const { question } = req.body;

//   try {
//     console.log(res.body);
//       const updatedQuiz = await Quiz.findByIdAndUpdate(
//           id,
//           { $push: { questions: question } },
//           { new: true }
//       );
//       res.status(200).json(updatedQuiz);
//   } catch (error) {
//       res.status(500).send(error.message);
//   }
// });


module.exports = router;
