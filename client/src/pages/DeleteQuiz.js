import React, { useState, useEffect } from 'react';

function DeleteQuiz() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('https://quizapi-saak1234s-projects.vercel.app/quizzes');
          if (response.ok) {
          const data = await response.json();
          setQuizzes(data); // Assuming the response data is the array of quizzes
        } else {
          throw new Error('Failed to fetch quizzes');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const deleteHandler = async (quizId) => {
    try {
      const response = await fetch(`https://quizapi-saak1234s-projects.vercel.app/quizzes/${quizId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Filter out the quiz that has been deleted
        setQuizzes(currentQuizzes => currentQuizzes.filter(quiz => quiz._id !== quizId));
      } else {
        throw new Error('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
    console.log("asdf");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {quizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id} // Ensure the key is the MongoDB _id if using MongoDB
              className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 border border-gray-200"
            >
              <div className="px-6 py-4">
                <h3 className="text-xl font-bold text-blue-600 mb-2">{quiz.title}</h3>
                <p className="text-gray-800">{quiz.description}</p>
              </div>
              <div className="px-6 py-4 bg-blue-100 border-t border-gray-200">
                <button
                  onClick={() => deleteHandler(quiz._id)} // Use _id for deletion
                  className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Delete Quiz
                </button>
              </div>
            </div>  
          ))}
        </div>
      )}
    </div>
  );
}

export default DeleteQuiz;
