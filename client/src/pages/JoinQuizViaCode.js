import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from './Quiz'; // Assuming you have a Quiz component to display quizzes

function JoinQuiz() {
  const [quizCode, setQuizCode] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (e) => {
    setQuizCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Join Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            value={quizCode}
            onChange={handleCodeChange}
            placeholder="Enter quiz code"
            className="w-full mr-2 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Join'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      {isLoading && <p className="text-gray-600 mt-2 text-lg">Loading quiz...</p>}
      {quiz && <Quiz quiz={quiz} />}
    </div>
  );
}

export default JoinQuiz;
