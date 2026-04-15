import React from 'react';
import '../styles/MathQuestionCard.css';

const MathQuestionCard = ({ question, choices, selectedAnswer, correctAnswer, showResult, onSelectAnswer }) => {
  return (
    <div className="question-card">
      <div className="question-display">
        <div className="question-text">{question.question}</div>
      </div>

      <div className="choices-grid">
        {choices.map((choice, index) => {
          const isSelected = selectedAnswer === choice;
          const isCorrect = choice === correctAnswer;
          const isWrong = isSelected && !isCorrect;

          let choiceClass = 'choice-button';
          if (showResult) {
            if (isCorrect) choiceClass += ' correct';
            if (isWrong) choiceClass += ' wrong';
          }
          if (isSelected && !showResult) choiceClass += ' selected';

          return (
            <button
              key={index}
              className={choiceClass}
              onClick={() => onSelectAnswer(choice)}
              disabled={selectedAnswer !== null}
            >
              <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
              <span className="choice-value">{choice}</span>
              {showResult && isCorrect && <span className="check-mark">✓</span>}
              {showResult && isWrong && <span className="x-mark">✗</span>}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`result-feedback ${selectedAnswer === correctAnswer ? 'correct' : 'incorrect'}`}>
          {selectedAnswer === correctAnswer ? (
            <>
              <span className="feedback-icon">🎉</span>
              <span className="feedback-text">Correct!</span>
            </>
          ) : (
            <>
              <span className="feedback-icon">❌</span>
              <span className="feedback-text">Incorrect. The correct answer is {correctAnswer}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MathQuestionCard;
