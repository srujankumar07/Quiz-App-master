import React, { useState, useEffect } from 'react';
import { QuestionData } from './QuestionData';
import QuizResult from './QuizResult';
import Login from './Login';

function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false); // Track if quiz has started

  // Function to handle authentication
  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn);
    if (isLoggedIn) {
      setQuizStarted(true); // Start quiz only after login
    }
  };

  // Countdown timer, starts only when the quiz is started
  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Clear timer when the component unmounts or question changes
    } else if (timeLeft === 0) {
      changeQuestion(); // Automatically move to the next question when time runs out
    }
  }, [quizStarted, timeLeft]);

  // Move to the next question
  const changeQuestion = () => {
    updateScore();

    if (currentQuestion < QuestionData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
      setTimeLeft(10); // Reset timer for the next question
    } else {
      setShowResult(true);
      setQuizStarted(false); // Stop quiz after last question
    }
  };

  const updateScore = () => {
    if (clickedOption === QuestionData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
    setTimeLeft(10); // Reset timer
    setQuizStarted(true); // Restart quiz
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <p className="heading-txt">Quiz App (Admin Only)</p>
      <div className="container">
        {showResult ? (
          <QuizResult score={score} totalScore={QuestionData.length} tryAgain={resetAll} />
        ) : (
          <>
            <div className="question">
              <span id="question-number">({currentQuestion + 1}). </span>
              <span id="question-txt">{QuestionData[currentQuestion].question}</span>
            </div>

            {/* Timer display */}
            <div className="timer">
              <p>Time left: {timeLeft} seconds</p>
            </div>

            <div className="option-container">
              {QuestionData[currentQuestion].options.map((option, i) => (
                <button
                  className={`option-btn ${clickedOption === i + 1 ? 'checked' : ''}`}
                  key={i}
                  onClick={() => setClickedOption(i + 1)}
                >
                  {option}
                </button>
              ))}
              <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
