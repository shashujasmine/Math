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

  const stories = {
    [QUESTION_TYPES.ADDITION]: [
      `Sally is exploring a sun-drenched orchard. She finds ${num1} ripe pears on the ground and then picks ${num2} more from a branch. How many pears does she have in total?`,
      `A young alchemist has ${num1} blue dragon scales. If they find ${num2} more in a hidden cave, how many scales will they have for their potion?`,
      `In a magical forest, ${num1} fireflies are dancing. ${num2} more join the party. How many fireflies are lighting up the woods now?`
    ],
    [QUESTION_TYPES.SUBTRACTION]: [
      `A brave explorer starts with ${num1} golden coins. After spending ${num2} coins on a map of the Lost City, how many coins remain in their pouch?`,
      `There are ${num1} apples in a basket. If a group of friendly deer comes by and eats ${num2} of them, how many apples are left?`,
      `A wizard has ${num1} magic scrolls. They use ${num2} scrolls to cast a rain-making spell. How many scrolls does the wizard have left?`
    ],
    [QUESTION_TYPES.MULTIPLICATION]: [
      `A baker is making ${num1} trays of cosmic cookies. Each tray holds ${num2} cookies. How many cookies are being baked in total?`,
      `There are ${num1} spider-bots in a high-tech lab. If each bot has ${num2} glowing eyes, how many eyes are watching from the shadows?`,
      `A gardener plants ${num1} rows of sun-flowers. If there are ${num2} flowers in each row, how many flowers will bloom in the garden?`
    ],
    [QUESTION_TYPES.DIVISION]: [
      `A treasure hunter finds ${num1} ancient gems. If they want to share them equally among ${num2} treasure chests, how many gems will go into each chest?`,
      `A spaceship has ${num1} energy cells. If it uses ${num2} cells for every light-year it travels, how many light-years can it fly?`,
      `There are ${num1} students going on a field trip. If each bus can carry ${num2} students, how many buses are needed for the journey?`
    ]
  };

  const selectedStories = stories[selectedType] || stories[QUESTION_TYPES.ADDITION];
  const storyTemplate = selectedStories[Math.floor(Math.random() * selectedStories.length)];

  return {
    question: storyTemplate,
    equation: `${num1} ${operator} ${num2} = ?`,
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