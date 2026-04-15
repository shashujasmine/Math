import React from 'react';
import { getStreakMessage } from '../utils/QuizLogic';
import '../styles/ScoreBoard.css';

const ScoreBoard = ({ score, total, streak, timeLeft, questionTimeLeft, difficulty, gameMode, pulseScore }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getStreakColor = () => {
    if (streak === 0) return 'neutral';
    if (streak >= 5) return 'hot';
    if (streak >= 2) return 'good';
    return 'regular';
  };

  return (
    <div className="score-board">
      <div className="score-display">
        <div className={`score-item score-main ${pulseScore ? 'pulse' : ''}`}>
          <div className="score-label">Score</div>
          <div className="score-value">{score}/{Math.max(total, 1)}</div>
        </div>

        <div className="score-item streak-display">
          <div className="score-label">Streak</div>
          <div className={`streak-value ${getStreakColor()}`}>
            <span className="streak-number">{streak}</span>
            <span className="streak-icon">🔥</span>
          </div>
          <div className="streak-message">{getStreakMessage(streak)}</div>
        </div>

        {gameMode === 'timed' && (
          <div className="score-item timer">
            <div className="score-label">Time</div>
            <div className={`time-value ${timeLeft < 60 ? 'warning' : ''}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        )}

        {questionTimeLeft !== undefined && (
          <div className={`score-item question-timer ${questionTimeLeft <= 3 ? 'critical' : ''}`}>
            <div className="score-label">Q Time</div>
            <div className={`question-time-value ${questionTimeLeft <= 3 ? 'danger' : ''}`}>
              {questionTimeLeft}s
            </div>
          </div>
        )}

        <div className="score-item difficulty-badge">
          <div className="difficulty-label">{difficulty.toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
