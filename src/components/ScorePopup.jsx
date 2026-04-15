import React, { useEffect, useState } from 'react';
import '../styles/ScorePopup.css';

const ScorePopup = ({ isVisible, onAnimationComplete }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
        setTimeout(() => {
          onAnimationComplete();
        }, 300);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete]);

  if (!isVisible && !animate) return null;

  return (
    <div className={`score-popup ${animate ? 'animate' : 'fade-out'}`}>
      <div className="popup-content">
        <span className="popup-icon">⭐</span>
        <span className="popup-text">+1 Point!</span>
      </div>
    </div>
  );
};

export default ScorePopup;
