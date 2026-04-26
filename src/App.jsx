import React, { useState, useCallback } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CQuiz from './components/CQuiz';
import CQuizResult from './components/CQuizResult';
import MathQuiz from './components/MathQuiz';
import StoryIntro from './components/StoryIntro';
import './styles/MathQuiz.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setCurrentPage('story');
  }, []);

  const handleStoryComplete = useCallback(() => {
    setCurrentPage('dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setCurrentPage('login');
    setQuizResults(null);
  }, []);

  const handleStartCQuiz = useCallback(() => {
    setQuizResults(null);
    setCurrentPage('cquiz');
  }, []);

  const handleStartMathQuiz = useCallback(() => {
    setCurrentPage('mathquiz');
  }, []);

  const handleCQuizFinish = useCallback((userAnswers, questions, timeTaken) => {
    setQuizResults({ userAnswers, questions, timeTaken });
    setCurrentPage('cresult');
  }, []);

  const handleRetryQuiz = useCallback(() => {
    setQuizResults(null);
    setCurrentPage('cquiz');
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setQuizResults(null);
    setCurrentPage('dashboard');
  }, []);

  switch (currentPage) {
    case 'login':
      return <Login onLogin={handleLogin} />;

    case 'story':
      return <StoryIntro user={user} onComplete={handleStoryComplete} />;

    case 'dashboard':
      return (
        <Dashboard
          user={user}
          onStartQuiz={handleStartCQuiz}
          onStartMathQuiz={handleStartMathQuiz}
          onLogout={handleLogout}
        />
      );

    case 'cquiz':
      return (
        <CQuiz
          user={user}
          onFinish={handleCQuizFinish}
          onBack={handleBackToDashboard}
        />
      );

    case 'cresult':
      return (
        <CQuizResult
          userAnswers={quizResults.userAnswers}
          questions={quizResults.questions}
          timeTaken={quizResults.timeTaken}
          user={user}
          onRetry={handleRetryQuiz}
          onDashboard={handleBackToDashboard}
        />
      );

    case 'mathquiz':
      return (
        <div>
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 1.5rem',
            background: 'rgba(10, 10, 15, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <button
              onClick={handleBackToDashboard}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              ← Back to Dashboard
            </button>
          </div>
          <MathQuiz />
        </div>
      );

    default:
      return <Login onLogin={handleLogin} />;
  }
}

export default App;
