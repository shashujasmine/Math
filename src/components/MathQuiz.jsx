import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  generateQuestion,
  generateMultipleChoices,
  calculateScore,
  getStreakMessage,
  DIFFICULTY_LEVELS
} from '../utils/QuizLogic';
import MathQuestionCard from './MathQuestionCard';
import ScoreBoard from './ScoreBoard';
import ScorePopup from './ScorePopup';
import '../styles/MathQuiz.css';
import '../styles/ScorePopup.css';

const MathQuiz = () => {
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS.MEDIUM);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, correct, wrong, finished
  const [questionsAnswered, setQuestionsAnswered] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [gameMode, setGameMode] = useState('timed'); // timed or unlimited
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(10); // 10 seconds per question
  
  // Use refs to prevent stale closures
  const timeoutRef = useRef(null);
  const questionTimeoutRef = useRef(null);
  const isComponentMountedRef = useRef(true);

  // DEFINE ALL CALLBACKS FIRST before useEffect
  const handleGameEnd = useCallback(() => {
    if (!isComponentMountedRef.current) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (questionTimeoutRef.current) clearTimeout(questionTimeoutRef.current);
    setGameStatus('finished');
  }, []);

  const generateNewQuestion = useCallback(() => {
    if (!isComponentMountedRef.current) return;
    if (questionTimeoutRef.current) clearTimeout(questionTimeoutRef.current);

    const question = generateQuestion(difficulty);
    const choicesList = generateMultipleChoices(question.answer, difficulty);

    setCurrentQuestion(question);
    setChoices(choicesList);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameStatus('playing');
    setQuestionTimeLeft(10);
  }, [difficulty]);

  const handleTimeUp = useCallback(() => {
    if (!isComponentMountedRef.current) return;
    if (questionTimeoutRef.current) {
      clearTimeout(questionTimeoutRef.current);
      questionTimeoutRef.current = null;
    }

    setStreak(0);
    setGameStatus('wrong');
    setShowResult(true);

    setTotalQuestions(prev => {
      const newTotal = prev + 1;
      setQuestionsAnswered(prev => [
        ...prev,
        {
          question: currentQuestion?.question || 'N/A',
          userAnswer: 'TIME_UP',
          correctAnswer: currentQuestion?.answer || 'N/A',
          isCorrect: false
        }
      ]);

      if (isComponentMountedRef.current) {
        setTimeout(() => {
          if (!isComponentMountedRef.current) return;
          if (newTotal >= 20 && gameMode === 'unlimited') {
            handleGameEnd();
          } else {
            generateNewQuestion();
          }
        }, 2000);
      }
      return newTotal;
    });
  }, [currentQuestion, gameMode, handleGameEnd, generateNewQuestion]);

  const handleAnswerSelection = useCallback((answer) => {
    if (!isComponentMountedRef.current) return;

    setSelectedAnswer(prev => {
      if (prev !== null) return prev;

      const isCorrect = answer === currentQuestion.answer;

      if (isCorrect) {
        setScore(s => s + 1);
        setStreak(s => s + 1);
        setGameStatus('correct');
        setShowScorePopup(true);
      } else {
        setStreak(0);
        setGameStatus('wrong');
      }

      const newTotal = totalQuestions + 1;
      setTotalQuestions(newTotal);

      setQuestionsAnswered(prev => [
        ...prev,
        {
          question: currentQuestion.question,
          userAnswer: answer,
          correctAnswer: currentQuestion.answer,
          isCorrect
        }
      ]);

      setShowResult(true);
      return answer;
    });
  }, [currentQuestion, totalQuestions]);

  const handleNext = useCallback(() => {
    if (!isComponentMountedRef.current) return;

    setTotalQuestions(prev => {
      if (prev >= 20 && gameMode === 'unlimited') {
        handleGameEnd();
        return prev;
      }
      return prev;
    });

    generateNewQuestion();
  }, [gameMode, handleGameEnd, generateNewQuestion]);

  const handleReplay = useCallback(() => {
    if (!isComponentMountedRef.current) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (questionTimeoutRef.current) clearTimeout(questionTimeoutRef.current);

    setDifficulty(DIFFICULTY_LEVELS.MEDIUM);
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
    setQuestionsAnswered([]);
    setTimeLeft(120);
    setQuestionTimeLeft(10);
    setGameMode('timed');
    setGameStatus('playing');
    setSelectedAnswer(null);
    setShowResult(false);

    generateNewQuestion();
  }, [generateNewQuestion]);

  const handleDifficultyChange = useCallback((newDifficulty) => {
    if (totalQuestions === 0) {
      setDifficulty(newDifficulty);
    }
  }, [totalQuestions]);

  // NOW define all useEffect hooks after callbacks
  useEffect(() => {
    generateNewQuestion();

    return () => {
      isComponentMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (questionTimeoutRef.current) clearTimeout(questionTimeoutRef.current);
    };
  }, [generateNewQuestion]);

  useEffect(() => {
    if (gameStatus === 'finished') return;

   if (timeLeft <= 0 && gameMode === 'timed') {
      if (isComponentMountedRef.current) {
        setGameStatus('finished');
      }
      return;
    }

    if (gameMode !== 'timed' || gameStatus !== 'playing') {
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (isComponentMountedRef.current) {
        setTimeLeft(prev => prev - 1);
      }
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [gameMode, gameStatus]);

  useEffect(() => {
    if (gameStatus !== 'playing' || selectedAnswer !== null) {
      if (questionTimeoutRef.current) clearTimeout(questionTimeoutRef.current);
      return;
    }

    if (questionTimeLeft <= 0) {
      if (isComponentMountedRef.current) {
        handleTimeUp();
      }
      return;
    }

    if (questionTimeoutRef.current) clearTimeout(questionTimeoutRef.current);

    questionTimeoutRef.current = setTimeout(() => {
      if (isComponentMountedRef.current) {
        setQuestionTimeLeft(prev => prev - 1);
      }
    }, 1000);

    return () => {
      if (questionTimeoutRef.current) clearTimeout(questionTimeoutRef.current);
    };
  }, [gameStatus, selectedAnswer, handleTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (gameStatus === 'finished') {
    const percentage = calculateScore(score, totalQuestions);
    let performanceMessage = '';
    
    if (percentage === 100) performanceMessage = 'Perfect Score!';
    else if (percentage >= 80) performanceMessage = 'Excellent!';
    else if (percentage >= 60) performanceMessage = 'Good Job!';
    else if (percentage >= 40) performanceMessage = 'Not Bad!';
    else performanceMessage = 'Keep Practicing!';

    return (
      <div className="quiz-container">
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
        <div className="game-header">
          <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="finishedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#ff6b9d', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#845ef7', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#20c997', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#finishedGrad)"/>
            <text x="50" y="65" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Fredoka">?</text>
          </svg>
          <h1 className="game-title">MATH MASTER</h1>
          <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="finishedGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#ff6b9d', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#845ef7', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#20c997', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#finishedGrad2)"/>
            <text x="50" y="65" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Fredoka">?</text>
          </svg>
          <p className="game-subtitle">Quiz Complete!</p>
        </div>

        <div className="finished-screen">
          <div className="result-card">
            <div className="result-trophy">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : percentage >= 40 ? '💪' : '📚'}
            </div>
            <h2 className="result-title">{performanceMessage.replace(/🏆|🌟|👍|💪|📚/g, '').trim()}</h2>
            
            <div className="final-score">
              <div className="score-value">{score}/{totalQuestions}</div>
              <div className="score-label">Correct Answers</div>
            </div>

            <div className="percentage-display">
              <div className="percentage-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="circle-bg" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    className="circle-fill"
                    style={{
                      strokeDasharray: `${(percentage / 100) * 283} 283`
                    }}
                  />
                </svg>
                <div className="percentage-text">{percentage}%</div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat">
                <div className="stat-value">{streak}</div>
                <div className="stat-label">Best Streak</div>
              </div>
              <div className="stat">
                <div className="stat-value">{totalQuestions}</div>
                <div className="stat-label">Questions</div>
              </div>
              <div className="stat">
                <div className="stat-value">{totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}</div>
                <div className="stat-label">Accuracy</div>
              </div>
            </div>

            <button className="btn-replay" onClick={handleReplay}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      <ScorePopup 
        isVisible={showScorePopup}
        onAnimationComplete={() => setShowScorePopup(false)}
      />

      <div className="game-header">
        <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="mathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#ff6b9d', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#845ef7', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#20c997', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#mathGrad)"/>
            <text x="50" y="65" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Fredoka">?</text>
          </svg>
        <h1 className="game-title">🧮 MATH MASTER 🧮</h1>
        <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="mathGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#ff6b9d', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#845ef7', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#20c997', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#mathGrad2)"/>
            <text x="50" y="65" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Fredoka">?</text>
          </svg>
        <p className="game-subtitle">Math Quiz Challenge</p>
      </div>

      <div className="quiz-content">
        <div className="question-section">
          {currentQuestion && (
            <>
              <ScoreBoard 
                score={score}
                total={totalQuestions}
                streak={streak}
                timeLeft={timeLeft}
                questionTimeLeft={questionTimeLeft}
                difficulty={difficulty}
                gameMode={gameMode}
                pulseScore={showScorePopup}
              />

              <MathQuestionCard
                question={currentQuestion}
                choices={choices}
                selectedAnswer={selectedAnswer}
                correctAnswer={currentQuestion.answer}
                showResult={showResult}
                onSelectAnswer={handleAnswerSelection}
              />

              <div className="question-footer">
                <div className="difficulty-selector">
                  <label>Difficulty:</label>
                  <div className="difficulty-buttons">
                    {[DIFFICULTY_LEVELS.EASY, DIFFICULTY_LEVELS.MEDIUM, DIFFICULTY_LEVELS.HARD].map(level => (
                      <button
                        key={level}
                        className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                        onClick={() => handleDifficultyChange(level)}
                        disabled={showResult}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {showResult && (
                  <button className="btn-next" onClick={handleNext}>
                    {totalQuestions >= 20 && gameMode === 'unlimited' ? 'Finish' : 'Next Question'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MathQuiz;
