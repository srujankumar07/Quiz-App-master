import React, { useState, useEffect } from 'react';
import { QuestionData } from './QuestionData';
import QuizResult from './QuizResult';
import Login from './Login';

function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn);
    if (isLoggedIn) {
      setQuizStarted(true);
    }
  };

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      changeQuestion();
    }
  }, [quizStarted, timeLeft]);

  const changeQuestion = () => {
    updateScore();

    if (currentQuestion < QuestionData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
      setTimeLeft(10);
    } else {
      setShowResult(true);
      setQuizStarted(false);
    }
  };

  const updateScore = () => {
    if (clickedOption === QuestionData[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
    setTimeLeft(10);
    setQuizStarted(true);
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
