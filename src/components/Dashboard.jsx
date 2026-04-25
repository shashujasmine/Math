import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ user, onStartQuiz, onStartMathQuiz, onLogout }) => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-bg-shapes">
        <div className="dash-shape dash-shape-1"></div>
        <div className="dash-shape dash-shape-2"></div>
        <div className="dash-shape dash-shape-3"></div>
      </div>

      {/* Top Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <div className="nav-logo">
            <span className="nav-bracket">&lt;</span>
            <span className="nav-c">C</span>
            <span className="nav-bracket">/&gt;</span>
          </div>
          <span className="nav-title">Quiz Master</span>
        </div>
        <div className="nav-right">
          <div className="nav-user">
            <div className="nav-avatar">{user.username.charAt(0).toUpperCase()}</div>
            <span className="nav-username">{user.username}</span>
          </div>
          <button className="nav-logout-btn" onClick={onLogout} id="logout-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="dashboard-content">
        <div className="welcome-section">
          <div className="welcome-greeting">
            <span className="welcome-wave">👋</span>
            <h1 className="welcome-title">Welcome back, <span className="welcome-name">{user.username}</span></h1>
          </div>
          <p className="welcome-subtitle">Choose a quiz to challenge yourself and test your knowledge</p>
        </div>

        {/* Quiz Cards Grid */}
        <div className="quiz-cards-grid">
          {/* C Programming Quiz Card */}
          <div className="quiz-card c-quiz-card" id="c-quiz-card">
            <div className="quiz-card-glow"></div>
            <div className="quiz-card-content">
              <div className="quiz-card-icon">
                <div className="card-icon-wrapper c-icon">
                  <span className="card-bracket">&lt;</span>
                  <span className="card-letter">C</span>
                  <span className="card-bracket">/&gt;</span>
                </div>
              </div>
              <div className="quiz-card-info">
                <h2 className="quiz-card-title">C Programming Quiz</h2>
                <p className="quiz-card-description">
                  Test your knowledge of C programming fundamentals including pointers, arrays, 
                  memory management, and control flow.
                </p>
                <div className="quiz-card-meta">
                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    <span>1 min</span>
                  </div>
                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                    <span>10 Questions</span>
                  </div>
                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span>MCQ</span>
                  </div>
                </div>
              </div>
              <button className="quiz-start-btn c-start-btn" onClick={onStartQuiz} id="start-c-quiz-btn">
                <span>Start Quiz</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Math Quiz Card */}
          <div className="quiz-card math-quiz-card" id="math-quiz-card">
            <div className="quiz-card-glow math-glow"></div>
            <div className="quiz-card-content">
              <div className="quiz-card-icon">
                <div className="card-icon-wrapper math-icon">
                  <span>🧮</span>
                </div>
              </div>
              <div className="quiz-card-info">
                <h2 className="quiz-card-title">Math Master</h2>
                <p className="quiz-card-description">
                  Challenge your math skills with addition, subtraction, multiplication, 
                  and division problems across difficulty levels.
                </p>
                <div className="quiz-card-meta">
                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    <span>2 min</span>
                  </div>
                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                    <span>Unlimited</span>
                  </div>
                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span>Timed</span>
                  </div>
                </div>
              </div>
              <button className="quiz-start-btn math-start-btn" onClick={onStartMathQuiz} id="start-math-quiz-btn">
                <span>Start Quiz</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10"/>
                <path d="M18 20V4"/>
                <path d="M6 20v-4"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-number">2</span>
              <span className="stat-text">Quizzes Available</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-number">{user.loginTime}</span>
              <span className="stat-text">Session Started</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
