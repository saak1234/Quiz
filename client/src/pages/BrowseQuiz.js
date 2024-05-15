  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Link } from 'react-router-dom';

  function BrowseQuiz() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
      // Fetch quizzes from the server
      const fetchQuizzes = async () => {
        try {
          const response = await axios.get('http://localhost:8080/quizzes'); // Adjust URL as per your backend API
          setQuizzes(response.data);
        } catch (error) {
          console.error('Error fetching quizzes:', error);
        }
      };

      fetchQuizzes();
    }, []);

    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex justify-center">Browse Quizzes</h2>
        {quizzes.length === 0 ? (
          <p className="text-gray-600">No quizzes available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 border border-gray-200"
              >
                <div className="px-6 py-4">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">{quiz.title}</h3>
                  <p className="text-gray-800">{quiz.description}</p>
                </div>
                <div className="px-6 py-4 bg-blue-100 border-t border-gray-200">
                  <Link to={`/start-quiz/${quiz._id}`}>
                    <button className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                      Attempt Quiz
                    </button>
                  </Link>
                </div>
                <div className="flex justify-between px-6 py-2 bg-blue-100 border-t border-gray-200">
                  <div>
                    <span className="text-sm text-gray-600">Questions:</span>
                    <span className="ml-1 font-semibold">{quiz.questions.length}</span>
                  </div>
                
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  export default BrowseQuiz;
