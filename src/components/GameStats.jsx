import React from 'react';
import '../styles/GameStats.css';

const GameStats = ({ gameHistory, gameStatus, currentPlayer, difficulty }) => {
  const capturedPieces = getCapturedPieces(gameHistory);
  
  const getStatusMessage = () => {
    if (gameStatus === 'checkmate') return '♔ Checkmate! Game Over';
    if (gameStatus === 'stalemate') return '= Stalemate - Draw';
    if (gameStatus === 'check') return '⚡ Check!';
    return '○ Game Playing';
  };
  
  const getStatusIcon = () => {
    if (gameStatus === 'checkmate') return '✓';
    if (gameStatus === 'stalemate') return '=';
    if (gameStatus === 'check') return '!';
    return '»';
  };
  
  return (
    <div className="game-stats">
      <div className="status-display">
        <div className="status-icon">{getStatusIcon()}</div>
        <div className="status-text">{getStatusMessage()}</div>
        <div className="turn-indicator">
          Turn: <span className={currentPlayer}>{currentPlayer.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="difficulty-badge">
        <span>Level: </span>
        <span className={`level ${difficulty.toLowerCase()}`}>{difficulty}</span>
      </div>
      
      <div className="move-counter">
        <span>Moves:</span> {Math.floor(gameHistory.length / 2)}
      </div>
      
      <div className="captured-pieces">
        <div className="captured-section white-captured">
          <div className="label">White Captured:</div>
          <div className="pieces-list">{capturedPieces.black}</div>
        </div>
        <div className="captured-section black-captured">
          <div className="label">Black Captured:</div>
          <div className="pieces-list">{capturedPieces.white}</div>
        </div>
      </div>
      
      {gameHistory.length > 0 && (
        <div className="last-move">
          <div className="label">Last Move:</div>
          <div className="move-text">{gameHistory[gameHistory.length - 1]}</div>
        </div>
      )}
    </div>
  );
};

const getCapturedPieces = (gameHistory) => {
  let whiteCaptures = '';
  let blackCaptures = '';
  
  gameHistory.forEach((move) => {
    if (move.includes('x')) {
      const piece = move.split('x')[1]?.charAt(0) || '♟';
      if (move.split(' ')[0].includes('White')) {
        blackCaptures += piece + ' ';
      } else {
        whiteCaptures += piece + ' ';
      }
    }
  });
  
  return { white: whiteCaptures || '-', black: blackCaptures || '-' };
};

export default GameStats;
