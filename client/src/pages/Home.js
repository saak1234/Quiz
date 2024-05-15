import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
const Home = () => {
  return (
    <>
      <header className="bg-blue-700 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold">Quiz App</h1>
        
        </div>
      </header>

      <div className="flex justify-center items-center h-screen bg-gray-100 space-x-5">
        <div className="mentor-section w-1/2 border-r border-gray-300 p-8 text-center bg-white rounded-lg shadow-lg t transition-transform transform hover:scale-105">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-4">Welcome, educators!</h2>
          <Link to="/TeacherSignIn">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full mb-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Teacher Login
            </button>
          </Link>
          <p className="text-gray-600">
            Don't have an account? <Link to="/TeacherSignUp" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </div>

        <div className="mentee-section w-1/2 p-8 text-center bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-4">Welcome, students!</h2>
          <Link to="/StudentSignIn">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full mb-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Student Login
            </button>
          </Link>
          <p className="text-gray-600">
            Don't have an account? <Link to="/StudentSignUp" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>

    <Footer/>
    </>
  );
}

export default Home;
