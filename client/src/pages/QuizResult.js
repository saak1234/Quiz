import React from 'react';

function QuizResult(props) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md mb-4 text-center">
        <p className="text-3xl font-bold text-blue-700 mb-4">Quiz Result</p>
        <p className="text-lg font-semibold">Your Score: {props.score}</p>
        <p className="text-lg font-semibold">Total Score: {props.totalScore}</p>
      </div>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        onClick={props.tryAgain}
      >
        Try Again
      </button>
    </div>
  );
}

export default QuizResult;
