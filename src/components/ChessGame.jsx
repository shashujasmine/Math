import React, { useState, useEffect } from 'react';
import {
  initializeBoard,
  movePiece,
  isValidMove,
  getAIMoveEasy,
  getAIMoveMedium,
  getAIMoveHard,
  getGameStatus,
  calculateStrategicPoints,
  getPointAdvantage,
  COLORS
} from '../utils/ChessLogic';
import ChessBoard from './ChessBoard';
import GameStats from './GameStats';
import GameControls from './GameControls';
import ScoreDisplay from './ScoreDisplay';
import '../styles/ChessGame.css';

const ChessGame = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState(COLORS.WHITE);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [difficulty, setDifficulty] = useState('Medium');
  const [gameHistory, setGameHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [aiThinking, setAiThinking] = useState(false);
  const [scores, setScores] = useState({ white: 0, black: 0, advantage: 0 });
  
  useEffect(() => {
    const newStatus = getGameStatus(board, currentPlayer);
    setGameStatus(newStatus);
    
    // Update scores
    const points = calculateStrategicPoints(board);
    setScores({
      white: points.white,
      black: points.black,
      advantage: points.white - points.black
    });
    
    if (newStatus === 'checkmate' || newStatus === 'stalemate') {
      return;
    }
    
    if (currentPlayer === COLORS.BLACK && !aiThinking) {
      setAiThinking(true);
      const timer = setTimeout(() => {
        makeAIMove();
        setAiThinking(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, aiThinking]);
  
  const makeAIMove = () => {
    let move = null;
    
    switch (difficulty) {
      case 'Easy':
        move = getAIMoveEasy(board, COLORS.BLACK);
        break;
      case 'Medium':
        move = getAIMoveMedium(board, COLORS.BLACK);
        break;
      case 'Hard':
        move = getAIMoveHard(board, COLORS.BLACK);
        break;
      default:
        move = getAIMoveMedium(board, COLORS.BLACK);
    }
    
    if (move) {
      makeMove(move.from, move.to);
    }
  };
  
  const makeMove = (from, to) => {
    const piece = board[from[0]][from[1]];
    if (!piece || !isValidMove(board, from, to, piece)) {
      return false;
    }
    
    const capturedPiece = board[to[0]][to[1]];
    const newBoard = movePiece(board, from, to);
    
    setBoard(newBoard);
    const moveNotation = convertToChessNotation(from, to, piece, capturedPiece);
    setGameHistory([...gameHistory, `${currentPlayer} ${moveNotation}`]);
    setCurrentPlayer(currentPlayer === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE);
    setSelectedSquare(null);
    
    return true;
  };
  
  const convertToChessNotation = (from, to, piece, capturedPiece) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const fromNotation = files[from[1]] + (8 - from[0]);
    const toNotation = files[to[1]] + (8 - to[0]);
    
    const capture = capturedPiece ? 'x' : '-';
    return `${fromNotation}${capture}${toNotation}`;
  };
  
  const handleMove = (from, to) => {
    makeMove(from, to);
    setScores({ white: 0, black: 0, advantage: 0 });
  };
  
  const handleNewGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer(COLORS.WHITE);
    setSelectedSquare(null);
    setGameHistory([]);
    setGameStatus('playing');
  };
  
  const handleUndo = () => {
    if (gameHistory.length >= 2) {
      // Reset board and replay moves except last two
      const newBoard = initializeBoard();
      const newHistory = gameHistory.slice(0, -2);
      
      // Replay all moves
      let tempBoard = newBoard;
      newHistory.forEach(move => {
        // Parse and apply moves (simplified)
      });
      
      setBoard(tempBoard);
      setGameHistory(newHistory);
      setCurrentPlayer(COLORS.WHITE);
      setSelectedSquare(null);
    }
  };
  
  const handleDifficultyChange = (newDifficulty) => {
    if (gameHistory.length === 0) {
      setDifficulty(newDifficulty);
    }
  };
  
  return (
    <div className="chess-game-container">
      <div className="game-header">
        <h1 className="game-title">
          ♟ CHESS MASTER ♟
        </h1>
        <p className="game-subtitle">3D Interactive Chess</p>
      </div>
      
      <div className="game-main">
        <div className="board-section">
          {aiThinking && <div className="ai-thinking">AI Thinking...</div>}
          <ChessBoard
            board={board}
            onMove={handleMove}
            selectedSquare={selectedSquare}
            setSelectedSquare={setSelectedSquare}
            gameStatus={gameStatus}
            currentPlayer={currentPlayer}
          />
        </div>
        
        <div className="sidebar">
          <GameStats
            gameHistory={gameHistory}
            gameStatus={gameStatus}
            currentPlayer={currentPlayer}
            difficulty={difficulty}
          />
          
          <GameControls
            onNewGame={handleNewGame}
            onUndo={handleUndo}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            gameStatus={gameStatus}
            gameHistory={gameHistory}
          />
        </div>
      </div>
      
      <ScoreDisplay 
        whiteScore={scores.white}
        blackScore={scores.black}
        advantage={scores.advantage}
        currentPlayer={currentPlayer}
      />
    </div>
  );
};

export default ChessGame;
