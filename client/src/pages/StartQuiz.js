import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuizResult from './QuizResult';

function StartQuiz() {
  const { quizId } = useParams(); // Get quizId from URL params
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchQuizQuestions();
  }, [quizId]); // Fetch questions when quizId changes

  const fetchQuizQuestions = async () => {
    try {
      const response = await fetch(`https://quizapi-saak1234s-projects.vercel.app/quizzes/${quizId}/questions`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
      }
      const data = await response.json();
      console.log(data);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };

  const updateScore = () => {
    if (clickedOption - 1 === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Quiz</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        {showResult ? (
          <QuizResult score={score} totalScore={questions.length} tryAgain={resetAll} />
        ) : (
          <>
            <div className="mb-8">
              <p className="text-lg font-semibold mb-2">Question {currentQuestion + 1}</p>
              <p className="text-xl">{questions[currentQuestion]?.question}</p>
            </div>
            <div>
              {questions[currentQuestion]?.options.map((option, i) => (
                <button
                  key={i}
                  className={`w-full bg-blue-500 text-white rounded-lg py-2 px-4 mb-4 hover:bg-blue-600 focus:outline-none ${
                    clickedOption === i + 1 ? 'bg-blue-600' : ''
                  }`}
                  onClick={() => setClickedOption(i + 1)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="mt-4 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
              onClick={changeQuestion}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default StartQuiz;
