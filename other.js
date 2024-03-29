import { checkIfLetterHasBeenGuessed, alphabet, letterBlanks } from './scripts.js'

const myStickman = document.getElementById('stickman')
const context = myStickman.getContext('2d')
const showLives = document.getElementById('mylives')
const numberOfSpacesInWord = 0

// OnClick Function
function attachClickEventListener (letter) {
  letter.onclick = function () {
    // letterGuessed is equal to the letter we clicked on
    const letterGuessed = (this.textContent)

    // add styling to remove letter from available options
    this.setAttribute('class', 'checked')

    // remove event listener from letter, so that nothing happens if letter is clicked again
    this.onclick = null

    // TODO: have students write this logic
    // when a letter is guessed, loop through the word to fill in any correct matches
    checkIfLetterHasBeenGuessed(letterGuessed)
  }
}

function createListForLetters () {
  const letters = document.createElement('ul')
  letters.id = 'alphabet'
  return letters
}

function createLetterForGuessing (alphabet, index, letters) {
  // const letters = createListOfLetters()
  const myButtons = document.getElementById('buttons')
  const letter = document.createElement('li')
  letter.id = 'letter'
  letter.textContent = alphabet[index]
  myButtons.appendChild(letters)
  letters.appendChild(letter)
  attachClickEventListener(letter)
}

function drawHangmanBox () {
  context.beginPath()
  context.strokeStyle = '#fff'
  context.lineWidth = 2
}

function head () {
  context.beginPath()
  context.arc(60, 25, 10, 0, Math.PI * 2, true)
  context.stroke()
}

function draw ($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy)
  context.lineTo($pathTox, $pathToy)
  context.stroke()
}

function base () {
  draw(0, 150, 150, 150)
}

function post () {
  draw(10, 0, 10, 600)
}

function ceiling () {
  draw(0, 5, 70, 5)
}

function noose () {
  draw(60, 5, 60, 15)
}

function torso () {
  draw(60, 36, 60, 70)
}

function rightArm () {
  draw(60, 46, 100, 50)
}

function leftArm () {
  draw(60, 46, 20, 50)
}

function rightLeg () {
  draw(60, 70, 100, 100)
}

function leftLeg () {
  draw(60, 70, 20, 100)
}

// Reset game
function resetGame () {
  document.getElementById('reset').onclick = function () {
    document.location.reload()
  }
}

// create letters for guessing - TODO: remove?
function generateButtons () {
  const letters = createListForLetters()
  // we need to add the following logic for every letter in our alphabet array
  for (let i = 0; i < alphabet.length; i++) {
    createLetterForGuessing(alphabet, i, letters)
  }
}
// Create guesses ul - TODO: remove?
function createBlanksForWord (word) {
  const wordHolder = document.getElementById('my-word-container')
  const myWordLetterList = document.createElement('ul')
  myWordLetterList.setAttribute('id', 'my-word')

  for (let i = 0; i < word.length; i++) {
    // this will create the blank for each letter
    const guess = document.createElement('li')
    guess.setAttribute('class', 'guess')

    // if (word[i] === ' ') {
    //   guess.textContent = ' '
    //   numberOfSpacesInWord += 1
    // } else {
    guess.textContent = '_'
    // }

    letterBlanks.push(guess)
    wordHolder.appendChild(myWordLetterList)
    myWordLetterList.appendChild(guess)
  }
}

const hangmanParts = [rightLeg, leftLeg, rightArm, leftArm, torso, head, noose, ceiling, post, base]

export { numberOfSpacesInWord, generateButtons, createBlanksForWord, createListForLetters, createLetterForGuessing, attachClickEventListener, showLives, drawHangmanBox, rightLeg, leftLeg, rightArm, leftArm, torso, head, noose, ceiling, post, base, resetGame }
