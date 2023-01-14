// This is a simple hangman game that uses the prompt-sync package to get user input.

// The hangman pictures, 6 lives
const HANGMANPICS = [
  `
  +---+
  |   |
      |
      |
      |
      |
=========
`,
`
  +---+
  |   |
  O   |
      |
      |
      |
=========
`,
`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
`,
`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
`,
`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========
`,
`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========
`,
`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========
`

]

const prompt = require("prompt-sync")({ sigint: true });

// Set up the words that the user can guess
const words = ['javascript', 'programming', 'webionista', 'pizza', 'linux'];

// Choose a random word from the array
const word = words[Math.floor(Math.random() * words.length)];

// Set up the array of underscores
const underscores = Array(word.length).fill('_');

// Set the number of chances the user has to guess the word
let chances = 6;

// Run the game loop
while (chances > 0) {

  // mapping each char in the string array and styling it to look like "_ _ z z _"
  console.log(`
  ${HANGMANPICS[HANGMANPICS.length - 1 - chances]}
  ${underscores.map(u => u === '_' ? ' _ ' : ` ${u} `).join('')}
  `)

  // Get the user's guess
  const guess = prompt('Guess a letter: ');

  // Check if the guess is in the word
  let found = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess) {
      underscores[i] = guess;
      found = true;
    }
  }

  // If the guess was not found, subtract one from the chances
  if (!found) {
    chances--;
  }




  // Check if the user has won
  if (underscores.join('') === word) {
    console.log(`You won! The word was ${word}`);
    break;
  }
}

// If the user has run out of chances, display the correct word
if (chances === 0) {
  console.log(`
  ${HANGMANPICS[HANGMANPICS.length - 1]}
  You lost! The correct word was ${word}
  `);
}