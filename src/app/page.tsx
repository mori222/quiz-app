'use client';

import React, { useState } from 'react';
import quizData from './data/quizData';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">クイズアプリ</h1>
      {currentQuestion < quizData.length ? (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl text-gray-700 mb-4">{quizData[currentQuestion].question}</h2>
          <div className="flex flex-col mb-4">
            {quizData[currentQuestion].options.map((option, index) => (
              <label key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="quiz-option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedOption(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
            答える
          </button>
        </form>
      ) : (
        <h2 className="text-2xl text-gray-800 mt-6">あなたのスコア: {score} / {quizData.length}</h2>
      )}
    </div>
  );
};

export default Quiz;
