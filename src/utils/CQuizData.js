// C Programming Quiz Questions Database
// Each question has: id, question, options (A-D), correctAnswer, explanation, topic

export const C_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the correct syntax to declare a pointer in C?",
    options: {
      A: "int ptr;",
      B: "int *ptr;",
      C: "ptr int;",
      D: "int &ptr;"
    },
    correctAnswer: "B",
    explanation: "In C, a pointer is declared using the asterisk (*) symbol before the variable name. 'int *ptr;' declares a pointer to an integer.",
    topic: "Pointers"
  },
  {
    id: 2,
    question: "Which header file is required for using printf() and scanf()?",
    options: {
      A: "<stdlib.h>",
      B: "<conio.h>",
      C: "<stdio.h>",
      D: "<string.h>"
    },
    correctAnswer: "C",
    explanation: "The <stdio.h> header file contains declarations for standard input/output functions like printf() and scanf().",
    topic: "Basics"
  },
  {
    id: 3,
    question: "What will be the output of: printf(\"%d\", sizeof(char));",
    options: {
      A: "2",
      B: "4",
      C: "8",
      D: "1"
    },
    correctAnswer: "D",
    explanation: "In C, the size of char is always 1 byte, regardless of the platform.",
    topic: "Data Types"
  },
  {
    id: 4,
    question: "Which of the following is NOT a valid storage class in C?",
    options: {
      A: "auto",
      B: "register",
      C: "dynamic",
      D: "extern"
    },
    correctAnswer: "C",
    explanation: "'dynamic' is not a storage class in C. The valid storage classes are: auto, register, static, and extern.",
    topic: "Storage Classes"
  },
  {
    id: 5,
    question: "What is the output of: int a = 5; printf(\"%d\", a++);",
    options: {
      A: "5",
      B: "6",
      C: "4",
      D: "Error"
    },
    correctAnswer: "A",
    explanation: "a++ is post-increment. It first uses the current value (5) in the expression, then increments it. So printf prints 5.",
    topic: "Operators"
  },
  {
    id: 6,
    question: "Which function is used to allocate memory dynamically in C?",
    options: {
      A: "alloc()",
      B: "malloc()",
      C: "new()",
      D: "create()"
    },
    correctAnswer: "B",
    explanation: "malloc() (Memory Allocation) is used to dynamically allocate a block of memory in C. It returns a void pointer.",
    topic: "Memory Management"
  },
  {
    id: 7,
    question: "What is the index of the first element in a C array?",
    options: {
      A: "1",
      B: "-1",
      C: "0",
      D: "Depends on array size"
    },
    correctAnswer: "C",
    explanation: "In C, arrays are zero-indexed. The first element of an array is always at index 0.",
    topic: "Arrays"
  },
  {
    id: 8,
    question: "Which keyword is used to prevent modification of a variable?",
    options: {
      A: "immutable",
      B: "final",
      C: "const",
      D: "static"
    },
    correctAnswer: "C",
    explanation: "The 'const' keyword is used to declare a variable whose value cannot be changed after initialization.",
    topic: "Keywords"
  },
  {
    id: 9,
    question: "What does the 'break' statement do in a switch case?",
    options: {
      A: "Exits the program",
      B: "Exits the current loop or switch",
      C: "Skips to next iteration",
      D: "Returns a value"
    },
    correctAnswer: "B",
    explanation: "The 'break' statement terminates the nearest enclosing loop or switch statement and transfers control to the statement following the terminated statement.",
    topic: "Control Flow"
  },
  {
    id: 10,
    question: "What is the correct way to declare a string in C?",
    options: {
      A: "String s = \"Hello\";",
      B: "char s[] = \"Hello\";",
      C: "string s = \"Hello\";",
      D: "char s = \"Hello\";"
    },
    correctAnswer: "B",
    explanation: "In C, strings are character arrays. 'char s[] = \"Hello\";' declares a character array initialized with the string \"Hello\" and a null terminator.",
    topic: "Strings"
  },
  {
    id: 11,
    question: "What does the '&' operator do when used with a variable?",
    options: {
      A: "Performs bitwise AND",
      B: "Returns the address of the variable",
      C: "Declares a reference",
      D: "Both A and B depending on context"
    },
    correctAnswer: "D",
    explanation: "The '&' operator serves dual purposes: as a unary operator it returns the address of a variable, and as a binary operator between two operands it performs bitwise AND.",
    topic: "Operators"
  },
  {
    id: 12,
    question: "Which loop is guaranteed to execute at least once?",
    options: {
      A: "for loop",
      B: "while loop",
      C: "do-while loop",
      D: "None of the above"
    },
    correctAnswer: "C",
    explanation: "A do-while loop checks the condition after executing the loop body, so it always executes at least once.",
    topic: "Control Flow"
  },
  {
    id: 13,
    question: "What is the output of: printf(\"%d\", 10 % 3);",
    options: {
      A: "3",
      B: "1",
      C: "3.33",
      D: "0"
    },
    correctAnswer: "B",
    explanation: "The % operator returns the remainder of integer division. 10 divided by 3 gives a remainder of 1.",
    topic: "Operators"
  },
  {
    id: 14,
    question: "How do you free dynamically allocated memory in C?",
    options: {
      A: "delete(ptr)",
      B: "dealloc(ptr)",
      C: "free(ptr)",
      D: "remove(ptr)"
    },
    correctAnswer: "C",
    explanation: "The free() function is used to deallocate memory that was previously allocated by malloc(), calloc(), or realloc().",
    topic: "Memory Management"
  },
  {
    id: 15,
    question: "What is the purpose of the 'void' return type in a function?",
    options: {
      A: "Function returns 0",
      B: "Function returns NULL",
      C: "Function does not return any value",
      D: "Function returns an empty string"
    },
    correctAnswer: "C",
    explanation: "The 'void' return type indicates that the function does not return any value to the calling function.",
    topic: "Functions"
  },
  {
    id: 16,
    question: "Which of the following is used to read a single character in C?",
    options: {
      A: "getchar()",
      B: "gets()",
      C: "scanf(\"%s\")",
      D: "read()"
    },
    correctAnswer: "A",
    explanation: "getchar() reads a single character from standard input (stdin) and returns it as an integer.",
    topic: "Input/Output"
  },
  {
    id: 17,
    question: "What does 'typedef' do in C?",
    options: {
      A: "Defines a new data type",
      B: "Creates an alias for an existing type",
      C: "Declares a variable",
      D: "Imports a library"
    },
    correctAnswer: "B",
    explanation: "typedef creates an alias (alternative name) for an existing data type. For example: typedef int Integer;",
    topic: "Data Types"
  },
  {
    id: 18,
    question: "What is a segmentation fault?",
    options: {
      A: "Syntax error",
      B: "Accessing memory that doesn't belong to the program",
      C: "Division by zero",
      D: "Stack overflow"
    },
    correctAnswer: "B",
    explanation: "A segmentation fault occurs when a program tries to access memory that it is not allowed to access, such as dereferencing a null pointer.",
    topic: "Memory Management"
  },
  {
    id: 19,
    question: "What is the correct syntax for a multi-line comment in C?",
    options: {
      A: "// comment //",
      B: "/* comment */",
      C: "<!-- comment -->",
      D: "# comment #"
    },
    correctAnswer: "B",
    explanation: "Multi-line comments in C start with /* and end with */. Single-line comments use //.",
    topic: "Basics"
  },
  {
    id: 20,
    question: "What is the output of: int x = 10; int y = x > 5 ? 100 : 200; printf(\"%d\", y);",
    options: {
      A: "10",
      B: "200",
      C: "100",
      D: "Error"
    },
    correctAnswer: "C",
    explanation: "This is the ternary operator. Since x (10) > 5 is true, y is assigned 100.",
    topic: "Operators"
  },
  {
    id: 21,
    question: "What does 'struct' keyword do in C?",
    options: {
      A: "Creates an object",
      B: "Defines a user-defined data type grouping related variables",
      C: "Declares a class",
      D: "Creates an array"
    },
    correctAnswer: "B",
    explanation: "The 'struct' keyword allows you to define a composite data type that groups variables of different types under a single name.",
    topic: "Structures"
  },
  {
    id: 22,
    question: "What is the NULL pointer in C?",
    options: {
      A: "A pointer that points to address 0",
      B: "A pointer to a deleted variable",
      C: "A pointer that has not been initialized",
      D: "A pointer with value -1"
    },
    correctAnswer: "A",
    explanation: "NULL is a macro defined in several header files that represents a null pointer constant, typically defined as ((void*)0).",
    topic: "Pointers"
  },
  {
    id: 23,
    question: "Which function is used to compare two strings in C?",
    options: {
      A: "strcompare()",
      B: "compare()",
      C: "strcmp()",
      D: "strequal()"
    },
    correctAnswer: "C",
    explanation: "strcmp() compares two strings character by character. It returns 0 if strings are identical, negative if first is less, positive if first is greater.",
    topic: "Strings"
  },
  {
    id: 24,
    question: "What is recursion in C?",
    options: {
      A: "A loop that runs forever",
      B: "A function that calls itself",
      C: "A pointer to a function",
      D: "An array of functions"
    },
    correctAnswer: "B",
    explanation: "Recursion is a technique where a function calls itself directly or indirectly to solve a problem by breaking it into smaller subproblems.",
    topic: "Functions"
  },
  {
    id: 25,
    question: "What is the size of 'int' on a typical 64-bit system?",
    options: {
      A: "2 bytes",
      B: "4 bytes",
      C: "8 bytes",
      D: "It depends on the compiler"
    },
    correctAnswer: "B",
    explanation: "On most modern 64-bit systems, int is 4 bytes (32 bits), though technically the size is implementation-defined by the compiler.",
    topic: "Data Types"
  }
];

// Shuffle questions using Fisher-Yates algorithm
export const shuffleQuestions = (questions, count = 10) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

// Get questions by topic
export const getQuestionsByTopic = (topic) => {
  return C_QUIZ_QUESTIONS.filter(q => q.topic === topic);
};

// Get all unique topics
export const getTopics = () => {
  return [...new Set(C_QUIZ_QUESTIONS.map(q => q.topic))];
};

// Calculate quiz results
export const calculateResults = (userAnswers, questions) => {
  let correct = 0;
  let incorrect = 0;
  const details = [];

  questions.forEach((q, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) correct++;
    else incorrect++;
    
    details.push({
      questionId: q.id,
      question: q.question,
      options: q.options,
      userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation,
      topic: q.topic
    });
  });

  const total = questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  let grade = '';
  let message = '';
  if (percentage >= 90) { grade = 'A+'; message = 'Outstanding! You\'re a C Programming Expert! 🏆'; }
  else if (percentage >= 80) { grade = 'A'; message = 'Excellent! Great command over C! 🌟'; }
  else if (percentage >= 70) { grade = 'B'; message = 'Good Job! Keep learning! 👏'; }
  else if (percentage >= 60) { grade = 'C'; message = 'Not bad! Room for improvement! 💪'; }
  else if (percentage >= 50) { grade = 'D'; message = 'You passed, but study harder! 📖'; }
  else { grade = 'F'; message = 'Keep practicing! You\'ll get better! 📚'; }

  return { correct, incorrect, total, percentage, grade, message, details };
};

export const QUIZ_CONFIG = {
  TOTAL_QUESTIONS: 10,
  TIME_PER_QUESTION: 30, // seconds
  TOTAL_TIME: 60, // 1 minute total
};
