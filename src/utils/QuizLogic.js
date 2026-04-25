export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

export const QUESTION_TYPES = {
  ADDITION: 'addition',
  SUBTRACTION: 'subtraction',
  MULTIPLICATION: 'multiplication',
  DIVISION: 'division',
  MIXED: 'mixed'
};

export const generateQuestion = (difficulty = DIFFICULTY_LEVELS.MEDIUM, type = QUESTION_TYPES.MIXED) => {
  let num1, num2, operator, answer;

  let selectedType = type;
  if (type === QUESTION_TYPES.MIXED) {
    const operators = [QUESTION_TYPES.ADDITION, QUESTION_TYPES.SUBTRACTION, QUESTION_TYPES.MULTIPLICATION, QUESTION_TYPES.DIVISION];
    selectedType = operators[Math.floor(Math.random() * operators.length)];
  }

  if (difficulty === DIFFICULTY_LEVELS.EASY) {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
  } else if (difficulty === DIFFICULTY_LEVELS.MEDIUM) {
    num1 = Math.floor(Math.random() * 50) + 1;
    num2 = Math.floor(Math.random() * 50) + 1;
  } else {
    num1 = Math.floor(Math.random() * 100) + 1;
    num2 = Math.floor(Math.random() * 100) + 1;
  }

  switch (selectedType) {
    case QUESTION_TYPES.ADDITION:
      operator = '+';
      answer = num1 + num2;
      break;
    case QUESTION_TYPES.SUBTRACTION:
      operator = '-';
      if (num1 < num2) {
        [num1, num2] = [num2, num1];
      }
      answer = num1 - num2;
      break;
    case QUESTION_TYPES.MULTIPLICATION:
      operator = 'x';
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      answer = num1 * num2;
      break;
    case QUESTION_TYPES.DIVISION:
      operator = '/';
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * answer;
      break;
    default:
      operator = '+';
      answer = num1 + num2;
  }

  return {
    question: `${num1} ${operator} ${num2} = ?`,
    answer,
    difficulty
  };
};

export const generateMultipleChoices = (correctAnswer, difficulty = DIFFICULTY_LEVELS.MEDIUM) => {
  const choices = new Set();
  choices.add(correctAnswer);

  const maxRange = difficulty === DIFFICULTY_LEVELS.EASY ? 10 : difficulty === DIFFICULTY_LEVELS.MEDIUM ? 20 : 50;
  
  while (choices.size < 4) {
    const offset = Math.floor(Math.random() * maxRange) + 1;
    const isNegative = Math.random() > 0.5;
    const wrongAnswer = isNegative ? correctAnswer - offset : correctAnswer + offset;
    
    if (wrongAnswer > 0 && wrongAnswer !== correctAnswer) {
      choices.add(wrongAnswer);
    }
  }

  return Array.from(choices).sort(() => Math.random() - 0.5);
};

export const calculateScore = (score, total) => {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
};

export const getStreakMessage = (streak) => {
  if (streak >= 10) return 'Unstoppable!';
  if (streak >= 7) return 'On Fire!';
  if (streak >= 5) return 'Hot Streak!';
  if (streak >= 3) return 'Heating Up!';
  if (streak >= 2) return 'Getting Started';
  return 'Start a Streak';
};