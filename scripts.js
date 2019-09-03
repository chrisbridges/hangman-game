import { drawHangmanBox, generateButtons, createBlanksForWord, showLives, resetGame, rightLeg, leftLeg, rightArm, leftArm, torso, head, noose, ceiling, post, base } from './other.js'

const word = randomWord()
// this array contains the blank spaces displayed to a player to guess their word
const letterBlanks = []
let lives = 10
let numberOfLettersGuessedCorrectly = 0
const alphabet = generateAlphabet()

play()

function randomWord () {
  // these are the words our players can guess - add whichever words you like
  // NOTE: for simplicity's sake, this game has been optimized for single words without spaces
  const words = [

  ]
  // choose a random word from our array of words for our game
  // HINT: we can use the Math methods of floor and random to help here
  let word
  // let's turn our chosen word into an array

  return word
}

// Note: "a" in JavaScript is returned from String.fromCharCode(97)
// "b" === String.fromCharCode(98)
// and so on...
function generateAlphabet () {
  const letters = []

  return letters
}

function checkIfLetterHasBeenGuessed (letterGuessed) {
  // whenever a letter is guessed, loop through our word and fill in letters that match the letter guessed
  // we can modify the text content of our letterBlanks elements by using .textContent = letterGuessed
  // if a user guesses a letter correctly, make sure to keep track of that to check if they've won

  // find a way to determine if our word contains the letter the user guessed
  // if the letter is not inside the word, deduct a life and draw part of the hangman
  // hint: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

}

function displayLives () {
  // if user has run out of lives - show "Game over"
  // display this with: showLives.textContent = "Game Over"
  // else tell user how many lives they have left
  // showLives.textContent = "You have {X} number of lives remaining"

  // check if user won game. If they did, let them know

}

// this will draw an additional piece of the hangman
function drawHangman () {
  // hangmanParts correlates to the number of lives a user has
  // how can we be sure to always draw the right body part in accordance with how many lives we have?
  // each item in this array is a function that will draw the hangman part
  // make sure when you access the hangman item that you call the function with () to draw that part
  const hangmanParts = [rightLeg, leftLeg, rightArm, leftArm, torso, head, noose, ceiling, post, base]

  // draw the hangman part
  
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

// NOTE: a lot of DOM manipulation and other logic has been abstracted away from this file into the other.js file
// the point of this exercise is to focus on the core logic of the game.
// Many aspects of this application do not follow what would commonly be considered best practices,
// but it serves as a fun jumping off point for now :)
