import React from 'react';
import { Link } from 'react-router-dom';
function TeacherHome() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome Teacher!</h1>
          <div className="flex justify-center space-x-4">
            <Link to="/create-quiz" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-md transition duration-300 ease-in-out">
              Create Quiz
            </Link>
            <Link to="/add-question" className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md transition duration-300 ease-in-out">
              Add Question
            </Link>
            <Link to="/delete-quiz" className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md transition duration-300 ease-in-out">
              Delete Quiz 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;
