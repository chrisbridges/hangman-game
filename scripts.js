import { drawHangmanBox, generateButtons, createBlanksForWord, showLives, resetGame, rightLeg, leftLeg, rightArm, leftArm, torso, head, noose, ceiling, post, base } from './other.js'

const word = randomWord()
const letterBlanks = []
let lives = 10
let numberOfLettersGuessedCorrectly = 0
const alphabet = generateAlphabet()

play()

// TODO: have students write this
// Note: "a" in JavaScript is returned from String.fromCharCode(97)
// "b" === String.fromCharCode(98)
// and so on...
function generateAlphabet () {
  const alphabet = []
  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(i + 97))
  }
  return alphabet
}

function randomWord () {
  // TODO: have students list words
  // TODO: potentially limit to single words for simplicity sake? - importing numberOfSpacesInWord
  const words = [
    'hangman', 'javascript', 'thinkful'
  ]
  // TODO: have students choose word at random
  // choose a random word from our array of words for our game
  // HINT: we can use the Math methods of floor and random to help here
  let word = words[Math.floor(Math.random() * words.length)]
  // let's turn our chosen word into an array
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

// Show lives - TODO: students can write this logic
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

// this will draw an additional piece of the hangman whenever we guess incorrectly
// TODO: students can write this logic
function drawHangman () {
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
