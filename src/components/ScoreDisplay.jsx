import React from 'react';
import '../styles/ScoreDisplay.css';

const ScoreDisplay = ({ whiteScore, blackScore, advantage, currentPlayer }) => {
  const isWhiteAdvantage = advantage > 0;
  const isBlackAdvantage = advantage < 0;
  const absAdvantage = Math.abs(advantage);
  
  return (
    <div className="score-display">
      <div className="score-card">
        <div className="score-row">
          <div className="player-score white-score">
            <div className="score-label">White (You)</div>
            <div className="score-number">{whiteScore}</div>
          </div>
          <div className="score-divider">vs</div>
          <div className="player-score black-score">
            <div className="score-label">Black (AI)</div>
            <div className="score-number">{blackScore}</div>
          </div>
        </div>
        
        <div className={`advantage-bar ${isWhiteAdvantage ? 'white-lead' : isBlackAdvantage ? 'black-lead' : 'equal'}`}>
          <div className="advantage-text">
            {isWhiteAdvantage ? `+${absAdvantage}` : isBlackAdvantage ? `−${absAdvantage}` : 'Equal'}
          </div>
          <div className="advantage-indicator">
            {currentPlayer === 'white' && <span className="current-turn">●</span>}
          </div>
        </div>
        
        <div className="score-status">
          <span className={`status-badge ${isWhiteAdvantage ? 'winning' : isBlackAdvantage ? 'losing' : 'equal'}`}>
            {isWhiteAdvantage ? '↑ Winning' : isBlackAdvantage ? '↓ Losing' : '= Balanced'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
