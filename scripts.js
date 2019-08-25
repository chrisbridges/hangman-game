import { drawHangmanBox, generateButtons, createBlanksForWord, showLives, resetGame, rightLeg, leftLeg, rightArm, leftArm, torso, head, noose, ceiling, post, base } from './other.js'

const word = randomWord()
// this array contains the blank spaces displayed to a player to guess our word
const letterBlanks = []
let lives = 10
let numberOfLettersGuessedCorrectly = 0
const alphabet = generateAlphabet()

play()

// Note: "a" in JavaScript is returned from String.fromCharCode(97)
// "b" === String.fromCharCode(98)
// and so on...
function generateAlphabet () {
  const letters = []
  for (let i = 0; i < 26; i++) {
    letters.push(String.fromCharCode(i + 97))
  }
  return letters
}

function randomWord () {
  const words = [
    'hangman', 'javascript', 'thinkful'
  ]
  // choose a random word from our array of words for our game
  // HINT: we can use the Math methods of floor and random to help here
  let word = words[Math.floor(Math.random() * words.length)]
  // let's turn our chosen word into an array
  // hint: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
  word = word.split('')
  return word
}

function checkIfLetterHasBeenGuessed (letterGuessed) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letterGuessed) {
      letterBlanks[i].textContent = letterGuessed
      numberOfLettersGuessedCorrectly += 1
    }
  }
  // find a way to determine if our word contains the letter the user guessed
  // if the letter is not inside the word, deduct a life and draw part of the hangman
  const wordDoesNotContainLetterGuessed = !word.includes(letterGuessed)

  if (wordDoesNotContainLetterGuessed) {
    lives -= 1
    drawHangman()
  }
  displayLives()
}

function displayLives () {
  // if user has run out of lives - show "Game over"
  // display this with: showLives.textContent = "Game Over"
  // else tell user how many lives they have left
  // showLives.textContent = "You have {X} number of lives remaining"
  if (lives <= 0) {
    showLives.textContent = 'Game Over'
  } else {
    showLives.textContent = 'You have ' + lives + ' lives'
  }
  // check if user won game
  if (numberOfLettersGuessedCorrectly === word.length) {
    showLives.textContent = 'You Win!'
  }
}

// this will draw an additional piece of the hangman
function drawHangman () {
  // hangmanParts correlates to the number of lives a user has
  // how can we be sure to always draw the right body part in accordance with how many lives we have?
  // each item in this array is a function that will draw the hangman part
  // make sure when you access the hangman item that you call the function with () to draw that part
  const hangmanParts = [rightLeg, leftLeg, rightArm, leftArm, torso, head, noose, ceiling, post, base]
  hangmanParts[lives]()
}

// Start our game
function play () {
  generateButtons()
  createBlanksForWord(word)
  displayLives()
  drawHangmanBox()
  resetGame()
}

export { checkIfLetterHasBeenGuessed, alphabet, letterBlanks }
