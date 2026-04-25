import React, { useState, useEffect, useRef, useCallback } from 'react';
import { shuffleQuestions, QUIZ_CONFIG } from '../utils/CQuizData';
import { C_QUIZ_QUESTIONS } from '../utils/CQuizData';
import Confetti from './Confetti';
import '../styles/CQuiz.css';

const CQuiz = ({ user, onFinish, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.TOTAL_TIME);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [validationError, setValidationError] = useState('');
  const timerRef = useRef(null);

  // Initialize quiz
  useEffect(() => {
    const quizQuestions = shuffleQuestions(C_QUIZ_QUESTIONS, QUIZ_CONFIG.TOTAL_QUESTIONS);
    setQuestions(quizQuestions);
    setQuizStarted(true);
  }, []);

  // Timer
  useEffect(() => {
    if (!quizStarted || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Auto-submit when time runs out
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizStarted]);

  const handleSubmitQuiz = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    onFinish(userAnswers, questions, QUIZ_CONFIG.TOTAL_TIME - timeLeft);
  }, [userAnswers, questions, timeLeft, onFinish]);

  const handleSelectAnswer = (letter) => {
    if (showFeedback) return;
    setSelectedAnswer(letter);
    setValidationError('');
    
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: letter
    }));
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer && !userAnswers[currentIndex]) {
      setValidationError('Please select an answer before proceeding');
      return;
    }

    const answer = selectedAnswer || userAnswers[currentIndex];
    const isCorrect = answer === questions[currentIndex].correctAnswer;
    
    setShowFeedback(true);
    
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleNext = () => {
    if (!showFeedback) {
      // User hasn't confirmed yet
      if (!selectedAnswer && !userAnswers[currentIndex]) {
        setValidationError('Please select an answer before proceeding');
        return;
      }
      handleConfirmAnswer();
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(userAnswers[currentIndex + 1] || null);
      setShowFeedback(false);
      setValidationError('');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[currentIndex - 1] || null);
      setShowFeedback(false);
      setValidationError('');
    }
  };

  const handleFinish = () => {
    // Check if all questions are answered
    const unanswered = questions.length - Object.keys(userAnswers).length;
    if (unanswered > 0) {
      setValidationError(`You still have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}`);
      return;
    }
    handleSubmitQuiz();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (questions.length === 0) {
    return (
      <div className="cquiz-page">
        <div className="cquiz-loading">
          <div className="cquiz-loader"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(userAnswers).length;
  const isLastQuestion = currentIndex === questions.length - 1;
  const isTimeLow = timeLeft <= 60;
  const isTimeCritical = timeLeft <= 30;

  return (
    <div className="cquiz-page">
      <div className="cquiz-bg-shapes">
        <div className="cq-shape cq-shape-1"></div>
        <div className="cq-shape cq-shape-2"></div>
      </div>

      <Confetti active={showConfetti} />

      {/* Top Bar */}
      <div className="cquiz-topbar">
        <button className="cquiz-back-btn" onClick={onBack} id="cquiz-back-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Exit Quiz</span>
        </button>

        <div className="cquiz-topbar-center">
          <div className="cquiz-question-counter">
            <span className="counter-current">{currentIndex + 1}</span>
            <span className="counter-sep">/</span>
            <span className="counter-total">{questions.length}</span>
          </div>
        </div>

        <div className={`cquiz-timer ${isTimeLow ? 'warning' : ''} ${isTimeCritical ? 'critical' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <span className="timer-text">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="cquiz-progress-wrapper">
        <div className="cquiz-progress-bar">
          <div 
            className="cquiz-progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="cquiz-progress-text">{answeredCount} of {questions.length} answered</span>
      </div>

      {/* Question Card */}
      <div className="cquiz-content">
        <div className="cquiz-question-card" key={currentQuestion.id}>
          <div className="cquiz-topic-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span>{currentQuestion.topic}</span>
          </div>

          <h2 className="cquiz-question-text">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="cquiz-options">
            {Object.entries(currentQuestion.options).map(([letter, text]) => {
              const isSelected = (selectedAnswer || userAnswers[currentIndex]) === letter;
              const isCorrect = showFeedback && letter === currentQuestion.correctAnswer;
              const isWrong = showFeedback && isSelected && letter !== currentQuestion.correctAnswer;

              let optionClass = 'cquiz-option';
              if (isSelected && !showFeedback) optionClass += ' selected';
              if (isCorrect) optionClass += ' correct';
              if (isWrong) optionClass += ' wrong';

              return (
                <button
                  key={letter}
                  className={optionClass}
                  onClick={() => handleSelectAnswer(letter)}
                  disabled={showFeedback}
                  id={`option-${letter}`}
                >
                  <span className="option-letter">{letter}</span>
                  <span className="option-text">{text}</span>
                  {isCorrect && (
                    <span className="option-feedback-icon correct-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </span>
                  )}
                  {isWrong && (
                    <span className="option-feedback-icon wrong-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`cquiz-feedback ${(selectedAnswer || userAnswers[currentIndex]) === currentQuestion.correctAnswer ? 'correct' : 'incorrect'}`}>
              <div className="feedback-header">
                {(selectedAnswer || userAnswers[currentIndex]) === currentQuestion.correctAnswer ? (
                  <>
                    <span className="feedback-emoji">🎉</span>
                    <span className="feedback-title">Correct!</span>
                  </>
                ) : (
                  <>
                    <span className="feedback-emoji">💡</span>
                    <span className="feedback-title">Incorrect</span>
                  </>
                )}
              </div>
              <p className="feedback-explanation">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="cquiz-validation-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
              <span>{validationError}</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="cquiz-navigation">
          <button 
            className="cquiz-nav-btn prev-btn" 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            id="prev-question-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Previous</span>
          </button>

          <div className="cquiz-question-dots">
            {questions.map((_, idx) => (
              <button
                key={idx}
                className={`question-dot ${idx === currentIndex ? 'active' : ''} ${userAnswers[idx] ? 'answered' : ''}`}
                onClick={() => {
                  setCurrentIndex(idx);
                  setSelectedAnswer(userAnswers[idx] || null);
                  setShowFeedback(false);
                  setValidationError('');
                }}
                title={`Question ${idx + 1}`}
              />
            ))}
          </div>

          {!isLastQuestion ? (
            <button 
              className="cquiz-nav-btn next-btn" 
              onClick={handleNext}
              id="next-question-btn"
            >
              <span>{showFeedback ? 'Next' : 'Confirm & Next'}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          ) : (
            <button 
              className="cquiz-nav-btn finish-btn" 
              onClick={showFeedback ? handleFinish : handleConfirmAnswer}
              id="finish-quiz-btn"
            >
              <span>{showFeedback ? 'Finish Quiz' : 'Confirm Answer'}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CQuiz;
