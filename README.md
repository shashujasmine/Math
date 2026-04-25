#  Quiz Master

An interactive, multi-module quiz platform built with **React 19** and **Vite**. Challenge yourself with a **C Programming Quiz** and a **Math Master** speed round — all wrapped in a stunning, modern UI with glassmorphism effects, smooth animations, and detailed performance analytics.

---

##  Features

###  Authentication
- Simple login screen with username & password validation
- Personalized dashboard greeting with session tracking
- Sleek glassmorphism login card with animated background shapes

###  Dashboard
- Central hub to choose between available quizzes
- Quick stats showing available quizzes and session info
- Per-user avatar and logout functionality

###  C Programming Quiz
- **25-question bank** covering Pointers, Arrays, Memory Management, Control Flow, Operators, Data Types, Strings, Functions, Structures, and more
- **10 randomized questions** per session (Fisher-Yates shuffle)
- **1-minute timed** quiz with live countdown
- MCQ format with instant correct/incorrect feedback and explanations
- Progress bar, question navigator dots, and question counter
- Detailed results page with:
  - Score breakdown and percentage grade (A+ through F)
  - Per-question review with your answer vs. correct answer
  - Topic-wise performance analysis
  - Confetti celebration on correct answers 🎉

###  Math Master
- **Dynamic question generation** — addition, subtraction, multiplication, and division
- **3 difficulty levels**: Easy, Medium, Hard
- **Timed mode** (2-minute global timer) and **Unlimited mode** (up to 20 questions)
- **10-second per-question timer** — auto-skip on timeout
- **Streak system** with bonus tracking for consecutive correct answers
- Multiple-choice answers with score popup and confetti effects
- End-of-game results with percentage circle, accuracy stats, and performance message

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Booking-system
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```
The app will be available at **`http://localhost:5173`**.

### Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

##  Built With

| Technology | Purpose |
|---|---|
| **React 19** | UI framework & component architecture |
| **Vite 8** | Build tool & lightning-fast dev server |
| **CSS3** | Custom styling with glassmorphism, gradients, and keyframe animations |
| **JavaScript (ES6+)** | Application logic, question generation, and quiz state management |
| **ESLint** | Code quality and linting |

---

##  Project Structure

```
Booking-system/
├── index.html                  # Entry point with SEO meta tags
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
├── .gitignore                  # Git ignore rules
├── src/
│   ├── main.jsx                # React DOM root
│   ├── App.jsx                 # Main app with page routing & state
│   ├── App.css                 # Global app styles
│   ├── index.css               # Base CSS reset & defaults
│   ├── components/
│   │   ├── Login.jsx           # Authentication screen
│   │   ├── Dashboard.jsx       # Quiz selection hub
│   │   ├── CQuiz.jsx           # C Programming quiz interface
│   │   ├── CQuizResult.jsx     # C Quiz detailed results page
│   │   ├── MathQuiz.jsx        # Math Master quiz interface
│   │   ├── MathQuestionCard.jsx# Math question display component
│   │   ├── ScoreBoard.jsx      # Live score & timer display
│   │   ├── ScorePopup.jsx      # Animated score notification
│   │   └── Confetti.jsx        # Celebration confetti effect
│   ├── utils/
│   │   ├── CQuizData.js        # C quiz question bank (25 questions) & helpers
│   │   └── QuizLogic.js        # Math question generator, scoring & difficulty
│   └── styles/
│       ├── Login.css           # Login page styles
│       ├── Dashboard.css       # Dashboard styles
│       ├── CQuiz.css           # C Quiz interface styles
│       ├── CQuizResult.css     # C Quiz results styles
│       ├── MathQuiz.css        # Math quiz styles
│       ├── MathQuestionCard.css# Question card styles
│       ├── ScoreBoard.css      # Scoreboard styles
│       ├── ScorePopup.css      # Score popup animation styles
│       └── Confetti.css        # Confetti animation styles
└── public/
    └── favicon.svg             # App favicon
```

---

##  App Flow

```
Login → Dashboard → Choose Quiz
                      ├── C Programming Quiz → Results (with review)
                      └── Math Master → Results (with stats)
```

1. **Login** — Enter any username and password (min 3 characters) to sign in.
2. **Dashboard** — View available quizzes and select one to start.
3. **Take a Quiz** — Answer questions within the time limit.
4. **Results** — Review your performance with detailed breakdowns.

---

##  Quiz Details

### C Programming Quiz
| Detail | Value |
|---|---|
| Total question bank | 25 |
| Questions per session | 10 (randomized) |
| Time limit | 1 minute |
| Format | MCQ (4 options: A–D) |
| Topics | Pointers, Arrays, Memory Management, Control Flow, Operators, Data Types, Strings, Functions, Structures, I/O, Keywords, Basics |

### Math Master
| Detail | Value |
|---|---|
| Question generation | Dynamic (infinite) |
| Difficulty levels | Easy, Medium, Hard |
| Operations | +, −, ×, ÷ |
| Per-question timer | 10 seconds |
| Global timer (Timed mode) | 2 minutes |
| Max questions (Unlimited) | 20 |

---

## License

This project is open-source and available under the **MIT License**.
