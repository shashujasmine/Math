import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  
  // Use refs for cleanup
  const aiTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  
  const makeMove = useCallback((from, to) => {
    if (!isMountedRef.current) return false;
    
    setBoard(prevBoard => {
      const piece = prevBoard[from[0]][from[1]];
      if (!piece || !isValidMove(prevBoard, from, to, piece)) {
        return prevBoard;
      }
      
      const capturedPiece = prevBoard[to[0]][to[1]];
      const newBoard = movePiece(prevBoard, from, to);
      
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const fromNotation = files[from[1]] + (8 - from[0]);
      const toNotation = files[to[1]] + (8 - to[0]);
      const capture = capturedPiece ? 'x' : '-';
      const moveNotation = `${fromNotation}${capture}${toNotation}`;
      
      setGameHistory(prev => [...prev, `${currentPlayer} ${moveNotation}`]);
      setCurrentPlayer(currentPlayer === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE);
      setSelectedSquare(null);
      
      return newBoard;
    });
    
    return true;
  }, [currentPlayer]);
  
  const makeAIMove = useCallback(() => {
    if (!isMountedRef.current) return;
    
    setBoard(prevBoard => {
      let move = null;
      
      switch (difficulty) {
        case 'Easy':
          move = getAIMoveEasy(prevBoard, COLORS.BLACK);
          break;
        case 'Medium':
          move = getAIMoveMedium(prevBoard, COLORS.BLACK);
          break;
        case 'Hard':
          move = getAIMoveHard(prevBoard, COLORS.BLACK);
          break;
        default:
          move = getAIMoveMedium(prevBoard, COLORS.BLACK);
      }
      
      if (move) {
        const piece = prevBoard[move.from[0]][move.from[1]];
        if (piece && isValidMove(prevBoard, move.from, move.to, piece)) {
          const capturedPiece = prevBoard[move.to[0]][move.to[1]];
          const newBoard = movePiece(prevBoard, move.from, move.to);
          
          const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          const fromNotation = files[move.from[1]] + (8 - move.from[0]);
          const toNotation = files[move.to[1]] + (8 - move.to[0]);
          const capture = capturedPiece ? 'x' : '-';
          const moveNotation = `${fromNotation}${capture}${toNotation}`;
          
          setGameHistory(prev => [...prev, `BLACK ${moveNotation}`]);
          setCurrentPlayer(COLORS.WHITE);
          setSelectedSquare(null);
          
          return newBoard;
        }
      }
      
      return prevBoard;
    });
  }, [difficulty]);
  
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      if (aiTimerRef.current) {
        clearTimeout(aiTimerRef.current);
        aiTimerRef.current = null;
      }
    };
  }, []);
  
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
    
    // Clear any pending AI timer
    if (aiTimerRef.current) {
      clearTimeout(aiTimerRef.current);
      aiTimerRef.current = null;
    }
    
    if (currentPlayer === COLORS.BLACK && !aiThinking && isMountedRef.current) {
      setAiThinking(true);
      aiTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          makeAIMove();
          setAiThinking(false);
        }
      }, 800);
    }
    
    return () => {
      if (aiTimerRef.current) {
        clearTimeout(aiTimerRef.current);
        aiTimerRef.current = null;
      }
    };
  }, [currentPlayer, board, aiThinking, makeAIMove]);
  
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
