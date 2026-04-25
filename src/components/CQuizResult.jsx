import React, { useState, useEffect } from 'react';
import { calculateResults } from '../utils/CQuizData';
import Confetti from './Confetti';
import '../styles/CQuizResult.css';

const CQuizResult = ({ userAnswers, questions, timeTaken, user, onRetry, onDashboard }) => {
  const [results, setResults] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);

  useEffect(() => {
    const res = calculateResults(
      questions.map((_, idx) => userAnswers[idx] || null),
      questions
    );
    setResults(res);

    // Trigger score animation
    setTimeout(() => setAnimateScore(true), 300);

    // Show confetti for good scores
    if (res.percentage >= 70) {
      setTimeout(() => setShowConfetti(true), 500);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [userAnswers, questions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (!results) {
    return (
      <div className="cresult-page">
        <div className="cresult-loading">
          <div className="cresult-loader"></div>
          <p>Calculating results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cresult-page">
      <div className="cresult-bg-shapes">
        <div className="cr-shape cr-shape-1"></div>
        <div className="cr-shape cr-shape-2"></div>
        <div className="cr-shape cr-shape-3"></div>
      </div>

      <Confetti active={showConfetti} />

      <div className="cresult-content">
        {/* Header */}
        <div className="cresult-header">
          <h1 className="cresult-title">Quiz Complete!</h1>
          <p className="cresult-subtitle">Here's how you performed, <span className="cresult-name">{user.username}</span></p>
        </div>

        {/* Score Card */}
        <div className="cresult-score-card">
          <div className="score-card-glow"></div>

          {/* Grade & Message */}
          <div className="cresult-grade-section">
            <div className={`grade-badge grade-${results.grade.replace('+', 'plus')}`}>
              {results.grade}
            </div>
            <p className="grade-message">{results.message}</p>
          </div>

          {/* Circular Score */}
          <div className="cresult-circle-wrap">
            <svg className="cresult-circle" viewBox="0 0 120 120">
              <circle 
                className="circle-track" 
                cx="60" cy="60" r="52" 
                fill="none" 
                strokeWidth="8"
              />
              <circle 
                className={`circle-progress ${animateScore ? 'animate' : ''}`}
                cx="60" cy="60" r="52" 
                fill="none" 
                strokeWidth="8"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${(results.percentage / 100) * 326.7} 326.7`,
                }}
              />
            </svg>
            <div className="circle-center">
              <span className="circle-percentage">{animateScore ? results.percentage : 0}%</span>
              <span className="circle-label">Score</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="cresult-stats-grid">
            <div className="cresult-stat correct-stat">
              <div className="stat-icon-circle correct-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-val">{results.correct}</span>
                <span className="stat-lbl">Correct</span>
              </div>
            </div>

            <div className="cresult-stat incorrect-stat">
              <div className="stat-icon-circle incorrect-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-val">{results.incorrect}</span>
                <span className="stat-lbl">Incorrect</span>
              </div>
            </div>

            <div className="cresult-stat total-stat">
              <div className="stat-icon-circle total-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-val">{results.total}</span>
                <span className="stat-lbl">Total</span>
              </div>
            </div>

            <div className="cresult-stat time-stat">
              <div className="stat-icon-circle time-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-val">{formatTime(timeTaken)}</span>
                <span className="stat-lbl">Time Taken</span>
              </div>
            </div>
          </div>

          {/* Score Breakdown Bar */}
          <div className="cresult-breakdown">
            <div className="breakdown-label">
              <span>Score Breakdown</span>
              <span>{results.correct} / {results.total}</span>
            </div>
            <div className="breakdown-bar">
              <div 
                className="breakdown-fill correct-fill" 
                style={{ width: `${(results.correct / results.total) * 100}%` }}
              />
              <div 
                className="breakdown-fill incorrect-fill" 
                style={{ width: `${(results.incorrect / results.total) * 100}%` }}
              />
            </div>
            <div className="breakdown-legend">
              <span className="legend-item"><span className="legend-dot correct-dot"></span>Correct</span>
              <span className="legend-item"><span className="legend-dot incorrect-dot"></span>Incorrect</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="cresult-actions">
            <button className="cresult-btn review-btn" onClick={() => setShowReview(!showReview)} id="toggle-review-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>{showReview ? 'Hide Review' : 'Review Answers'}</span>
            </button>
            <button className="cresult-btn retry-btn" onClick={onRetry} id="retry-quiz-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 4v6h6"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
              <span>Retry Quiz</span>
            </button>
            <button className="cresult-btn dashboard-btn" onClick={onDashboard} id="go-dashboard-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        {/* Review Section */}
        {showReview && (
          <div className="cresult-review-section">
            <h2 className="review-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Answer Review
            </h2>

            <div className="review-cards">
              {results.details.map((detail, index) => (
                <div key={index} className={`review-card ${detail.isCorrect ? 'review-correct' : 'review-incorrect'}`}>
                  <div className="review-card-header">
                    <span className="review-q-number">Q{index + 1}</span>
                    <span className="review-topic">{detail.topic}</span>
                    <span className={`review-badge ${detail.isCorrect ? 'badge-correct' : 'badge-incorrect'}`}>
                      {detail.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  <p className="review-question">{detail.question}</p>

                  <div className="review-options">
                    {Object.entries(detail.options).map(([letter, text]) => {
                      let optClass = 'review-option';
                      if (letter === detail.correctAnswer) optClass += ' review-opt-correct';
                      if (letter === detail.userAnswer && !detail.isCorrect) optClass += ' review-opt-wrong';

                      return (
                        <div key={letter} className={optClass}>
                          <span className="review-opt-letter">{letter}</span>
                          <span className="review-opt-text">{text}</span>
                          {letter === detail.correctAnswer && (
                            <span className="review-opt-tag correct-tag">Correct Answer</span>
                          )}
                          {letter === detail.userAnswer && letter !== detail.correctAnswer && (
                            <span className="review-opt-tag wrong-tag">Your Answer</span>
                          )}
                          {letter === detail.userAnswer && detail.isCorrect && (
                            <span className="review-opt-tag correct-tag">Your Answer ✓</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!detail.isCorrect && (
                    <div className="review-explanation">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4M12 8h.01"/>
                      </svg>
                      <span>{detail.explanation}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CQuizResult;
