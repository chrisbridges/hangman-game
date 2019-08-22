import { drawHangmanBox, createLetterForGuessing, attachClickEventListener, createListForLetters, drawArray, resetGame } from './other.js'

const word = randomWord()
const letterBlanks = []
let numberOfSpacesInWord = 0
let lives = 10
let numberOfLettersGuessedCorrectly = 0
const showLives = document.getElementById('mylives')

play(word)

function randomWord () {
  // TODO: have students list words
  const words = [
    'hangman is fun', 'la clippers', 'kawhi leonard', 'coding is fun', 'javascript', 'thinkful'
  ]
  // TODO: have students choose word at random
  // choose a random word from our array of words for our game
  let word = words[Math.floor(Math.random() * words.length)]
  // let's turn our chosen word into an array
  word = word.split('')
  return word
}

// create letters for guessing
function generateButtons () {
  // generate an array of the alphabet
  const alphabet = generateAlphabet()

  const letters = createListForLetters()
  // we need to add the following logic for every letter in our alphabet array
  for (let i = 0; i < alphabet.length; i++) {
    createLetterForGuessing(alphabet, i, letters)
  }
}

function didUserWinGame () {
  if (numberOfLettersGuessedCorrectly + numberOfSpacesInWord === word.length) {
    showLives.textContent = 'You Win!'
  }
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
  didUserWinGame()
}

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

// this will draw an additional piece of the hangman whenever we guess incorrectly
// TODO: students can write this logic
function drawHangman () {
  drawArray[lives]()
}

// Show lives - TODO: students can write this logic
function displayLives () {
  // if user has run out of lives - show "Game over"
  // display this with: showLives.textContent = "Game Over"
  // else tell user how many lives they have left
  // showLives.textContent = "You have X number of lives remaining"
  if (lives <= 0) {
    showLives.textContent = 'Game Over'
  } else {
    showLives.textContent = 'You have ' + lives + ' lives'
  }
}

// Create guesses ul
function createBlanksForWord (word) {
  const wordHolder = document.getElementById('my-word-container')
  const myWordLetterList = document.createElement('ul')
  myWordLetterList.setAttribute('id', 'my-word')

  for (let i = 0; i < word.length; i++) {
    // this will create the blank for each letter
    const guess = document.createElement('li')
    guess.setAttribute('class', 'guess')

    if (word[i] === ' ') {
      guess.textContent = ' '
      numberOfSpacesInWord += 1
    } else {
      guess.textContent = '_'
    }

    letterBlanks.push(guess)
    wordHolder.appendChild(myWordLetterList)
    myWordLetterList.appendChild(guess)
  }
}

// function resetValues () {
//   word
//   letterBlanks = []
//   lives = 10
//   numberOfLettersGuessedCorrectly = 0
//   numberOfSpacesInWord = 0
//   myWordLetterList
//   letters
//   context
// }

// Start our game
function play (word) {
  // // reset variables for new game
  // letterBlanks = []
  // lives = 10
  // // keep track of the number of words player has correctly guessed
  // numberOfLettersGuessedCorrectly = 0
  // // if a word has spaces, we need to keep track of those as well for win condition
  // numberOfSpacesInWord = 0

  // resetValues()
  generateButtons()
  createBlanksForWord(word)
  displayLives()
  drawHangmanBox()
  resetGame()
}

export { checkIfLetterHasBeenGuessed }
