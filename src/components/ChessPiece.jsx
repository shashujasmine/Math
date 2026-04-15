import React from 'react';
import { PIECES } from '../utils/ChessLogic';
import '../styles/ChessPiece.css';

const ChessPiece = ({ type, color }) => {
  const getPieceCharacter = (type) => {
    switch (type) {
      case PIECES.PAWN: return '♟';
      case PIECES.ROOK: return '♜';
      case PIECES.KNIGHT: return '♞';
      case PIECES.BISHOP: return '♝';
      case PIECES.QUEEN: return '♛';
      case PIECES.KING: return '♚';
      default: return '♟';
    }
  };
  
  const getInvertedCharacter = (type) => {
    switch (type) {
      case PIECES.PAWN: return '♙';
      case PIECES.ROOK: return '♖';
      case PIECES.KNIGHT: return '♘';
      case PIECES.BISHOP: return '♗';
      case PIECES.QUEEN: return '♕';
      case PIECES.KING: return '♔';
      default: return '♙';
    }
  };
  
  return (
    <div className={`piece ${type} ${color}`}>
      <span className="piece-unicode">
        {color === 'white' ? getInvertedCharacter(type) : getPieceCharacter(type)}
      </span>
    </div>
  );
};

export default ChessPiece;
