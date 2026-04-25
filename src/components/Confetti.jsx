import React, { useEffect, useState } from 'react';

const Confetti = ({ active }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;

    const colors = ['#ff6b9d', '#845ef7', '#20c997', '#ffd43b', '#51cf66'];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 1,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 100
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 2500);
    return () => clearTimeout(timer);
  }, [active]);

  if (!particles.length) return null;

  return (
    <div className="confetti-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            '--drift': `${p.drift}px`,
            transform: `rotate(${p.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;