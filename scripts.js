window.onload = function () {

  // generate an array of the alphabet
    // Bonus: find your own way of generating an array containing the alphabet
  const alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97))

  let word
  let letterBlanks = []
  let lives = 10
  let numberOfLettersGuessedCorrectly = 0
  let numberOfSpacesInWord = 0
  let myWordLetterList
  let letters
  // TODO: have students list words
  let words = [
    "a b c"
  ]

  // Start our game
  function play () {
    // TODO: have students choose word at random
    // choose a random word from our array of words for our game
    word = words[Math.floor(Math.random() * words.length)]
    // let's turn our chosen word into an array
    word = word.split('')
    
    // reset variables for new game
    letterBlanks = []
    lives = 10
    numberOfLettersGuessedCorrectly = 0
    numberOfSpacesInWord = 0

    generateButtons()
    createBlanksForWord()
    displayLives()
    drawHangmanBox()
  }

  // create letters for guessing
  function generateButtons () {
    myButtons = document.getElementById('buttons')
    letters = document.createElement('ul')
    letters.id = 'alphabet'

    // we need to add the following logic for every letter in our alphabet array
    for (let i = 0; i < alphabet.length; i++) {
      letter = document.createElement('li')
      letter.id = 'letter'
      letter.textContent = alphabet[i]
      myButtons.appendChild(letters)
      letters.appendChild(letter)
      attachClickEventListener()
    }
  }

  // OnClick Function
  attachClickEventListener = function () {
    letter.onclick = function () {
      // letterGuessed is equal to the letter we clicked on
      let letterGuessed = (this.textContent)

      // add styling to remove letter from available options
      this.setAttribute("class", "checked")

      // remove event listener from letter, so that nothing happens if letter is clicked again
      this.onclick = null

      // TODO: have students write this logic
      // when a letter is guessed, loop through the word to fill in any correct matches
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letterGuessed) {
          letterBlanks[i].textContent = letterGuessed
          numberOfLettersGuessedCorrectly += 1
        } 
      }

      // find a way to determine if our word contains the letter the user guessed
        // if the letter is not inside the word, deduct a life and draw part of the hangman
      let wordDoesNotContainLetterGuessed = !word.includes(letterGuessed)

      if (wordDoesNotContainLetterGuessed) {
        lives -= 1
        drawHangman()
      }
      displayLives()
      didUserWinGame()
    }
  }

  // this will draw an additional piece of the hangman whenever we guess incorrectly
  // TODO: students can write this logic
  function drawHangman () {
    drawArray[lives]()
  }

  // Create guesses ul
  function createBlanksForWord () {
    let wordHolder = document.getElementById('my-word-container')
    myWordLetterList = document.createElement('ul')
    myWordLetterList.setAttribute('id', 'my-word')

    for (let i = 0; i < word.length; i++) {
      // this will create the blank for each letter
      let guess = document.createElement('li')
      guess.setAttribute('class', 'guess')

      if (word[i] === " ") {
        guess.textContent = " "
        numberOfSpacesInWord += 1
      }
      else {
        guess.textContent = "_"
      }

      letterBlanks.push(guess)
      wordHolder.appendChild(myWordLetterList)
      myWordLetterList.appendChild(guess)
    }
  }

  let showLives = document.getElementById("mylives")
  
  // Show lives - TODO: students can write this logic
  function displayLives () {
    // if user has run out of lives - show "Game over"
      // display this with: showLives.textContent = "Game Over"
    // else tell user how many lives they have left
      // showLives.textContent = "You have X number of lives remaining"
    if (lives <= 0) {
      showLives.textContent = "Game Over"
    } else {
      showLives.textContent = "You have " + lives + " lives"
    }
  }

  function didUserWinGame () {
    if (numberOfLettersGuessedCorrectly + numberOfSpacesInWord === word.length) {
      showLives.textContent = "You Win!"
    }
  }

  function drawHangmanBox () {
    myStickman = document.getElementById("stickman")
    context = myStickman.getContext('2d')
    context.beginPath()
    context.strokeStyle = "#fff"
    context.lineWidth = 2
  }
  
  function head (){
    myStickman = document.getElementById("stickman")
    context = myStickman.getContext('2d')
    context.beginPath()
    context.arc(60, 25, 10, 0, Math.PI*2, true)
    context.stroke()
  }
    
  function draw ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy)
    context.lineTo($pathTox, $pathToy)
    context.stroke() 
  }

  function base () {
    draw (0, 150, 150, 150)
  }
  
  function post () {
    draw (10, 0, 10, 600)
  }

  function ceiling () {
    draw (0, 5, 70, 5)
  }

  function noose () {
    draw (60, 5, 60, 15)
  }

  function torso () {
    draw (60, 36, 60, 70)
  }

  function rightArm () {
    draw (60, 46, 100, 50)
  }

  function leftArm () {
    draw (60, 46, 20, 50)
  }

  function rightLeg () {
    draw (60, 70, 100, 100)
  }

  function leftLeg () {
    draw (60, 70, 20, 100)
  }

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, noose, ceiling, post, base] 

  play()

  // Reset game
  document.getElementById('reset').onclick = function () {
    // remove the old word blanks
    myWordLetterList.parentNode.removeChild(myWordLetterList)
    // remove the guessing letters
    letters.parentNode.removeChild(letters)
    // remove the hangman
    context.clearRect(0, 0, 400, 400)
    play()
  }
}
