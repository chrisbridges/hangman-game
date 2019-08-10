window.onload = function () { // TODO: rename many of these things so it's more apparent what they do

  // generate an array of the alphabet
  const alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97))

  let word
  let guess
  let guesses = []
  let lives = 10
  let counter = 0
  let space = 0

  // create alphabet ul
  let buttons = function () {
    myButtons = document.getElementById('buttons')
    letters = document.createElement('ul')

    for (let i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet'
      list = document.createElement('li')
      list.id = 'letter'
      list.innerHTML = alphabet[i]
      myButtons.appendChild(letters)
      letters.appendChild(list)
      attachClickEventListener()
    }
  }

  // OnClick Function
  attachClickEventListener = function () {
    list.onclick = function () {
      let letterGuessed = (this.innerHTML)
      console.log(letterGuessed)

      // add styling to remove guess from options
      this.setAttribute("class", "checked")

      // remove event listener from letter
      this.onclick = null

      // TODO: have students write this logic
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letterGuessed) {
          guesses[i].innerHTML = letterGuessed
          counter += 1
        } 
      }
      let j = (word.indexOf(letterGuessed))
      if (j === -1) {
        lives -= 1
        animate()
      }
      updateLives()
    }
  }

  // Animate man - TODO: students can write this logic
  let animate = function () {
    drawArray[lives]()
  }

  // Create guesses ul
  createBlanksForWord = function () {
    wordHolder = document.getElementById('my-word-container')
    myWordLetterList = document.createElement('ul')
    myWordLetterList.setAttribute('id', 'my-word')

    for (let i = 0; i < word.length; i++) {
      // this will create the blank for each letter
      guess = document.createElement('li')
      guess.setAttribute('class', 'guess')

      if (word[i] === "-") {
        guess.innerHTML = "-"
        space += 1
      } 
      if (word[i] === " ") {
        guess.innerHTML = " "
        space += 1
      }
      else {
        guess.innerHTML = "_"
      }

      guesses.push(guess)
      wordHolder.appendChild(myWordLetterList)
      myWordLetterList.appendChild(guess)
    }
  }

  const showLives = document.getElementById("mylives")
  
  // Show lives - TODO: students can write this logic
  updateLives = function () {
    showLives.innerHTML = "You have " + lives + " lives"
    if (lives < 1) {
      showLives.innerHTML = "Game Over"
    }
    for (let i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "You Win!"
      }
    }
  }
    
  // Play
  play = function () {
    // TODO: have students list words
    words = [
      "a b c"
    ]

    // TODO: have students choose word at random
    word = words[Math.floor(Math.random() * words.length)]
    // convert string into array
    word = word.split('')
    console.log(word) // reprecussions of converting word to array?
    
    // reset variables for new game
    guesses = []
    lives = 10
    counter = 0
    space = 0

    buttons()
    createBlanksForWord()
    updateLives()
    canvas()
  }

  // Reset game
  document.getElementById('reset').onclick = function() {
    myWordLetterList.parentNode.removeChild(myWordLetterList)
    letters.parentNode.removeChild(letters)
    context.clearRect(0, 0, 400, 400)
    play()
  }

  // Hangman
  canvas =  function(){
    myStickman = document.getElementById("stickman")
    context = myStickman.getContext('2d')
    context.beginPath()
    context.strokeStyle = "#fff"
    context.lineWidth = 2
  }
  
  head = function(){
    myStickman = document.getElementById("stickman")
    context = myStickman.getContext('2d')
    context.beginPath()
    context.arc(60, 25, 10, 0, Math.PI*2, true)
    context.stroke()
  }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy)
    context.lineTo($pathTox, $pathToy)
    context.stroke() 
  }

  base = function() {
    draw (0, 150, 150, 150)
  }
  
  post = function() {
    draw (10, 0, 10, 600)
  }

  ceiling = function() {
    draw (0, 5, 70, 5)
  }

  noose = function() {
    draw (60, 5, 60, 15)
  }

  torso = function() {
    draw (60, 36, 60, 70)
  }

  rightArm = function() {
    draw (60, 46, 100, 50)
  }

  leftArm = function() {
    draw (60, 46, 20, 50)
  }

  rightLeg = function() {
    draw (60, 70, 100, 100)
  }

  leftLeg = function() {
    draw (60, 70, 20, 100)
  }

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, noose, ceiling, post, base] 

  play()
}
