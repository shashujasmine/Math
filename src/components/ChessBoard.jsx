import React, { useState } from 'react';
import { COLORS, getValidMoves, movePiece } from '../utils/ChessLogic';
import ChessPiece from './ChessPiece';
import '../styles/ChessBoard.css';

const ChessBoard = ({ board, onMove, selectedSquare, setSelectedSquare, gameStatus, currentPlayer }) => {
  const renderSquare = (row, col) => {
    const piece = board[row][col];
    const isWhiteSquare = (row + col) % 2 === 0;
    const isSelected = selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
    const isValidMove = selectedSquare && getValidMoves(board, selectedSquare).some(m => m[0] === row && m[1] === col);
    
    return (
      <div
        key={`${row}-${col}`}
        className={`square ${isWhiteSquare ? 'white' : 'black'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
        onClick={() => handleSquareClick(row, col)}
      >
        {isValidMove && <div className="valid-move-indicator" />}
        {piece && <ChessPiece type={piece.type} color={piece.color} />}
      </div>
    );
  };
  
  const handleSquareClick = (row, col) => {
    if (currentPlayer === COLORS.BLACK) return; // Prevent moves during AI turn
    
    const piece = board[row][col];
    
    if (selectedSquare) {
      const validMoves = getValidMoves(board, selectedSquare);
      const isValidMove = validMoves.some(m => m[0] === row && m[1] === col);
      
      if (isValidMove) {
        onMove(selectedSquare, [row, col]);
        setSelectedSquare(null);
      } else if (piece && piece.color === COLORS.WHITE) {
        setSelectedSquare([row, col]);
      } else {
        setSelectedSquare(null);
      }
    } else if (piece && piece.color === COLORS.WHITE) {
      setSelectedSquare([row, col]);
    }
  };
  
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      squares.push(renderSquare(row, col));
    }
  }
  
  return (
    <div className="chess-board-wrapper">
      <div className="chess-board" style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        border: '8px solid #8b7355'
      }}>
        {squares}
      </div>
      <div className="board-labels">
        <div className="files">
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(f => <div key={f} className="file-label">{f}</div>)}
        </div>
        <div className="ranks">
          {[8, 7, 6, 5, 4, 3, 2, 1].map(r => <div key={r} className="rank-label">{r}</div>)}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
