import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddQuestion() {
  const [quizzes, setQuizzes] = useState([]);
  const [showForm, setShowForm] = useState({});
  const [newQuestions, setNewQuestions] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/quizzes');
        setQuizzes(response.data);
        initializeQuestionForms(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const initializeQuestionForms = (quizzes) => {
    const initialForms = {};
    const initialQuestions = {};
    quizzes.forEach(quiz => {
      initialForms[quiz._id] = false;
      initialQuestions[quiz._id] = { question: '', options: ['', '', '', ''], correctAnswer: 0 };
    });
    setShowForm(initialForms);
    setNewQuestions(initialQuestions);
  };

  const handleQuestionChange = (quizId, value) => {
    setNewQuestions(prev => ({
      ...prev,
      [quizId]: { ...prev[quizId], question: value }
    }));
  };

  const handleOptionChange = (quizId, index, value) => {
    const updatedOptions = [...newQuestions[quizId].options];
    updatedOptions[index] = value;
    setNewQuestions(prev => ({
      ...prev,
      [quizId]: { ...prev[quizId], options: updatedOptions }
    }));
  };

  const handleCorrectAnswerChange = (quizId, value) => {
    setNewQuestions(prev => ({
      ...prev,
      [quizId]: { ...prev[quizId], correctAnswer: parseInt(value) }
    }));
  };

  const addQuestionToQuiz = async (quizId) => {
    try {
      const response = await axios.post(`http://localhost:8080/quizzes/${quizId}/questions`, newQuestions[quizId]);
      if (response.status === 201) {
        alert('Question added successfully');
        setShowForm(prev => ({ ...prev, [quizId]: false }));
      } 
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {quizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes available</p>
      ) : (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-white rounded-lg shadow-lg overflow-hidden my-4">
            <div className="px-6 py-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">{quiz.title}</h3>
              <button
                onClick={() => setShowForm(prev => ({ ...prev, [quiz._id]: !prev[quiz._id] }))}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {showForm[quiz._id] ? 'Cancel' : 'Add Question'}
              </button>
              {showForm[quiz._id] && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={newQuestions[quiz._id].question}
                    onChange={(e) => handleQuestionChange(quiz._id, e.target.value)}
                    placeholder="Enter question"
                    className="block w-full mt-2 p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                  {newQuestions[quiz._id].options.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(quiz._id, index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="block w-full mt-2 p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                  ))}
                  <select
                    value={newQuestions[quiz._id].correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(quiz._id, e.target.value)}
                    className="block w-full mt-2 p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {newQuestions[quiz._id].options.map((_, index) => (
                      <option key={index} value={index}>{`Option ${index + 1}`}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => addQuestionToQuiz(quiz._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Submit Question
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AddQuestion;
