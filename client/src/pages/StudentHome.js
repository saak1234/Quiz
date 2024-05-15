import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';

function StudentHome() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome Students!</h1>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none"
              >
                Take Quiz
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-md shadow-md mt-2">
                  <Link
                    to="/browse-quiz"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out"
                  >
                    Browse Quiz
                  </Link>
                  <Link
                    to="/join-quiz"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out"
                  >
                    Join Quiz via Code
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/start-quiz"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Start Quiz
            </Link>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentHome;
