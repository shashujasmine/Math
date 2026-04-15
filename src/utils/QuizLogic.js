// Math Quiz Question Generator
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
  
  const ranges = {
    easy: { max: 10 },
    medium: { max: 50 },
    hard: { max: 100 }
  };
  
  const max = ranges[difficulty].max;
  
  // Choose operator
  let selectedType = type;
  if (type === QUESTION_TYPES.MIXED) {
    const operators = [QUESTION_TYPES.ADDITION, QUESTION_TYPES.SUBTRACTION, QUESTION_TYPES.MULTIPLICATION, QUESTION_TYPES.DIVISION];
    selectedType = operators[Math.floor(Math.random() * operators.length)];
  }
  
  // Generate numbers based on difficulty
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
  
  // Calculate answer based on operator
  switch (selectedType) {
    case QUESTION_TYPES.ADDITION:
      operator = '+';
      answer = num1 + num2;
      break;
    case QUESTION_TYPES.SUBTRACTION:
      operator = '-';
      // Ensure positive result for easier difficulty
      if (difficulty === DIFFICULTY_LEVELS.EASY && num1 < num2) {
        [num1, num2] = [num2, num1];
      }
      answer = num1 - num2;
      break;
    case QUESTION_TYPES.MULTIPLICATION:
      operator = '×';
      // Smaller numbers for multiplication
      num1 = Math.floor(Math.random() * (difficulty === DIFFICULTY_LEVELS.EASY ? 10 : difficulty === DIFFICULTY_LEVELS.MEDIUM ? 15 : 20)) + 1;
      num2 = Math.floor(Math.random() * (difficulty === DIFFICULTY_LEVELS.EASY ? 10 : difficulty === DIFFICULTY_LEVELS.MEDIUM ? 15 : 20)) + 1;
      answer = num1 * num2;
      break;
    case QUESTION_TYPES.DIVISION:
      operator = '÷';
      // Ensure clean division
      const divisor = Math.floor(Math.random() * (difficulty === DIFFICULTY_LEVELS.EASY ? 10 : 15)) + 2;
      const quotient = Math.floor(Math.random() * (difficulty === DIFFICULTY_LEVELS.EASY ? 10 : 15)) + 1;
      num1 = divisor * quotient;
      num2 = divisor;
      answer = quotient;
      break;
    default:
      operator = '+';
      answer = num1 + num2;
  }
  
  return {
    question: `${num1} ${operator} ${num2}`,
    answer: Math.round(answer),
    operator,
    num1,
    num2,
    type: selectedType,
    difficulty
  };
};

export const generateMultipleChoices = (correctAnswer, difficulty = DIFFICULTY_LEVELS.MEDIUM) => {
  const choices = [correctAnswer];
  
  // Generate wrong answers
  while (choices.length < 4) {
    let wrongAnswer;
    const variance = difficulty === DIFFICULTY_LEVELS.EASY ? 5 : difficulty === DIFFICULTY_LEVELS.MEDIUM ? 10 : 20;
    
    wrongAnswer = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * variance) + 1);
    
    if (!choices.includes(wrongAnswer) && wrongAnswer >= 0) {
      choices.push(wrongAnswer);
    }
  }
  
  // Shuffle choices
  return choices.sort(() => Math.random() - 0.5);
};

export const calculateScore = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const getStreakMessage = (streak) => {
  if (streak === 0) return 'Keep trying!';
  if (streak === 1) return 'Good start!';
  if (streak === 2) return 'Nice streak!';
  if (streak === 3) return 'Hot hand! 🔥';
  if (streak === 5) return 'Incredible! 🌟';
  if (streak >= 10) return 'Unstoppable! 💪';
  return 'Great job!';
};
