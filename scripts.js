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
        space = 1
      } else {
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
    let drawMe = lives 
    drawArray[drawMe]()
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
      let geuss = (this.innerHTML)
      this.setAttribute("class", "active")
      this.onclick = null
      for (let i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          guesses[i].innerHTML = geuss
          counter += 1
        } 
      }
      let j = (word.indexOf(geuss))
      if (j === -1) {
        lives -= 1
        comments()
        animate()
      } else {
        comments()
      }
    }
  }
  
    
  // Play
  play = function () {
    categories = [
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ]

    chosenCategory = categories[Math.floor(Math.random() * categories.length)]
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)]
    word = word.replace(/\s/g, "-")
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
  
  // Hint

  //   hint.onclick = function() {

  //     hints = [
  //       ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
  //       ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
  //       ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
  //   ]

  //   let catagoryIndex = categories.indexOf(chosenCategory)
  //   let hintIndex = chosenCategory.indexOf(word)
  //   showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex]
  // }

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct)
    letters.parentNode.removeChild(letters)
    // showClue.innerHTML = ""
    context.clearRect(0, 0, 400, 400)
    play()
  }
}
