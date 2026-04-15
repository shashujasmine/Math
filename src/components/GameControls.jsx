import React from 'react';
import '../styles/GameControls.css';

const GameControls = ({
  onNewGame,
  onUndo,
  difficulty,
  onDifficultyChange,
  gameStatus,
  gameHistory
}) => {
  const isGameOver = gameStatus === 'checkmate' || gameStatus === 'stalemate';
  
  return (
    <div className="game-controls">
      <div className="controls-section">
        <h3>Game Controls</h3>
        
        <div className="difficulty-selector">
          <label>Difficulty:</label>
          <div className="difficulty-buttons">
            {['Easy', 'Medium', 'Hard'].map(level => (
              <button
                key={level}
                className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                onClick={() => onDifficultyChange(level)}
                disabled={gameHistory.length > 0}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        <div className="action-buttons">
          <button
            className="btn btn-new-game"
            onClick={onNewGame}
          >
            ↻ New Game
          </button>
          
          <button
            className="btn btn-undo"
            onClick={onUndo}
            disabled={gameHistory.length < 2}
          >
            ↶ Undo Move
          </button>
        </div>
      </div>
      
      <div className="game-info">
        <h3>How to Play</h3>
        <ul>
          <li>Click a piece to select it</li>
          <li>Click a highlighted square to move</li>
          <li>Drag and drop pieces (optional)</li>
          <li>AI moves automatically after your turn</li>
          <li>Win by checkmating the opponent</li>
        </ul>
      </div>
    </div>
  );
};

export default GameControls;
