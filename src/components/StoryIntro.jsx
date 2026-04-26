import React, { useState } from 'react';
import '../styles/StoryIntro.css';

const StoryIntro = ({ user, onComplete }) => {
  const [currentPanel, setCurrentPanel] = useState(0);

  const panels = [
    {
      image: "🌐",
      title: "SYSTEM CRITICAL!",
      text: "The year is 202X. The Digital Realm is falling into darkness. Logical anomalies and arithmetic voids are tearing the fabric of the web!",
      action: "Next Panel",
      style: "panel-emergency"
    },
    {
      image: "🛡️",
      title: "THE CALL",
      text: `We need a champion. Someone with the logic of a C-Master and the speed of a Math-Wizard. We found you, ${user.username}!`,
      action: "I'm Ready",
      style: "panel-hero"
    },
    {
      image: "⚡",
      title: "THE CHOICE",
      text: "Two gates stand before you. One leads to the depths of Memory Management, the other to the Infinite Equation. Choose your path wisely.",
      action: "Let's Go!",
      style: "panel-choice"
    }
  ];

  const handleNext = () => {
    if (currentPanel < panels.length - 1) {
      setCurrentPanel(currentPanel + 1);
    } else {
      onComplete();
    }
  };

  const current = panels[currentPanel];

  return (
    <div className="story-page">
      <div className="comic-container">
        <div className={`comic-panel ${current.style} active`}>
          <div className="panel-header">
            <span className="panel-tag">PANEL #{currentPanel + 1}</span>
            <h2 className="comic-title">{current.title}</h2>
          </div>
          
          <div className="comic-visual">
            <span className="comic-emoji">{current.image}</span>
            <div className="comic-impact">KAPOW!</div>
          </div>

          <div className="comic-bubble">
            <p className="bubble-text">{current.text}</p>
            <div className="bubble-tail"></div>
          </div>

          <button className="comic-btn" onClick={handleNext}>
            {current.action}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="comic-footer">
          <div className="panel-dots">
            {panels.map((_, i) => (
              <div key={i} className={`dot ${i === currentPanel ? 'active' : ''}`}></div>
            ))}
          </div>
          <button className="skip-btn" onClick={onComplete}>Skip Intro</button>
        </div>
      </div>
    </div>
  );
};

export default StoryIntro;
