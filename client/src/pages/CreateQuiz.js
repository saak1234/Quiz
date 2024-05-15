import React, { useState } from 'react';
import axios from 'axios';

function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  const [errors, setErrors] = useState([]);

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = parseInt(e.target.value);
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: 0 },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isValid = validateInputs();
    if (!isValid) return;
  
    try {
      const response = await axios.post('http://localhost:8080/create-quiz', { 
        title: quizTitle,
        description: quizDescription,
        questions: questions    
      });
  
      if (response.status === 201) {
        console.log('Quiz created successfully');
        // Reset form fields after successful submission
        setQuizTitle('');
        setQuizDescription('');
        setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
      } else {
        console.error('Error creating quiz:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const validateInputs = () => {
    const newErrors = [];
    if (!quizTitle.trim()) {
      newErrors.push(`Quiz title is required`);
    }
    if (!quizDescription.trim()) {
      newErrors.push(`Quiz description is required`);
    }
    questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors.push(`Question ${index + 1}: Question is required`);
      }
      question.options.forEach((option, optionIndex) => {
        if (!option.trim()) {
          newErrors.push(`Question ${index + 1}, Option ${optionIndex + 1}: Option is required`);
        }
      });
      if (question.correctAnswer === 0) {
        newErrors.push(`Question ${index + 1}: Correct answer is required`);
      }
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-semibold">Quiz Title:</label>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 shadow-md"
              placeholder="Enter quiz title..."
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-semibold">Quiz Description:</label>
            <textarea
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 shadow-md"
              rows="4"
              placeholder="Enter quiz description..."
            />
          </div>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-6 bg-gray-50 rounded-lg p-4 shadow-md">
              <label className="block mb-2 text-gray-800 font-semibold">{`Question ${questionIndex + 1}:`}</label>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 shadow-md"
                placeholder="Enter your question here..."
              />
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mt-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 shadow-md"
                    placeholder={`Enter option ${optionIndex + 1} here...`}
                  />
                </div>
              ))}
              <div className="mt-2">
                <label className="block mb-1 text-gray-800">Correct Answer:</label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(questionIndex, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 shadow-md"
                >
                  <option value={0}>Select correct answer...</option>
                  {question.options.map((option, index) => (
                    <option key={index} value={index + 1}>{`Option ${index + 1}`}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="mb-4 w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-md"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-md"
          >
            Create Quiz
          </button>
          {errors.length > 0 && (
            <div className="mt-4 text-red-600">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz;
