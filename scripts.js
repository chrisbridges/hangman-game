window.onload = function () {

  // generate an array of the alphabet
  const alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97))

  let word
  let guess
  let guesses = []
  let lives
  let counter
  let space

  // Get elements
  let showLives = document.getElementById("mylives")

  // create alphabet ul
  let buttons = function () {
    myButtons = document.getElementById('buttons')
    letters = document.createElement('ul')

    for (let i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet'
      list = document.createElement('li')
      list.id = 'letter'
      list.innerHTML = alphabet[i]
      check()
      myButtons.appendChild(letters)
      letters.appendChild(list)
    }
  }

  // Create guesses ul
   result = function () {
    wordHolder = document.getElementById('hold')
    correct = document.createElement('ul')

    for (let i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word')
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
      wordHolder.appendChild(correct)
      correct.appendChild(guess)
    }
  }
  
  // Show lives
   comments = function () {
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

  // Animate man
  let animate = function () {
    drawArray[lives]()
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

   frame1 = function() {
     draw (0, 150, 150, 150)
   }
   
   frame2 = function() {
     draw (10, 0, 10, 600)
   }
  
   frame3 = function() {
     draw (0, 5, 70, 5)
   }
  
   frame4 = function() {
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
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1] 


  // OnClick Function
   check = function () {
    list.onclick = function () {
      let guess = (this.innerHTML)
      this.setAttribute("class", "active")
      this.onclick = null
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess
          counter += 1
        } 
      }
      let j = (word.indexOf(guess))
      if (j === -1) {
        lives -= 1
        animate()
      }
      comments()
    }
  }
  
  // Play
  play = function () {
    words = [
      "another other word"
    ]

    // chosenCategory = words[Math.floor(Math.random() * words.length)]
    word = words[Math.floor(Math.random() * words.length)]
    word = word.replace(/\s/g, " ")
    console.log(word)
    buttons()

    guesses = [ ]
    lives = 10
    counter = 0
    space = 0
    result()
    comments()
    canvas()
  }

  play()

   // Reset
  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct)
    letters.parentNode.removeChild(letters)
    // showClue.innerHTML = ""
    context.clearRect(0, 0, 400, 400)
    play()
  }
}
