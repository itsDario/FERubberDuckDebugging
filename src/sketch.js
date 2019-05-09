let lastEnteredWord = []
let enteredString = []
let success = ''
let ducksArray
let codeLibrary = []
let randomCode
let easyCodeArray = []
let hardCodeArray = []
let gameStartTime
let yellowDuckImage
let redDuckImage
let startScreenLogo
let bathTubeImage
let timeOfLastDuck = 0
let timeBetweenDucks = 4000
// let timeBetweenDucks = 16000//test timing
let points = 0 //number of ducks successfully entered
let scene = 1
let gameOverImage


//python -m SimpleHTTPServer  to host a local server

function pullRandomCode() {
  //pull new word thats not on screen already
  let randomN = Math.random()
  let difficultyCodeArray = easyCodeArray
  console.log(randomN);

  if (randomN < 0.8) {
    difficultyCodeArray = easyCodeArray
  } else {
    difficultyCodeArray = hardCodeArray
  }

  randomCode = difficultyCodeArray[Math.floor(Math.random() * difficultyCodeArray.length)];

  while (ducksArray["currentWords"].indexOf(randomCode.code) > -1) {

    randomCode = difficultyCodeArray[Math.floor(Math.random() * difficultyCodeArray.length)];
  }

  return randomCode
}

function codeFilter() {
  easyCodeArray = codeLibrary.filter(word => {
    return word.category.difficulty === "easy"
  })
  hardCodeArray = codeLibrary.filter(word => {
    return word.category.difficulty === "hard"
  })

}


function setup() {
  textSize(20)
  gameOverImage = loadImage("./ducks/emptytubgameover.png")
  startScreenLogo = loadImage("./ducks/ducklogo.png")
  yellowDuckImage = loadImage('./ducks/yellow.png')
  redDuckImage = loadImage('./ducks/red.png')
  imageMode(CENTER);

  fetch("http://localhost:3000/words")
    .then(response => response.json())
    .then(words => {
      words.forEach((word) => {
        codeLibrary.push(word)
      })
      codeFilter()
      fillRandomItem(pullRandomCode(easyCodeArray)) //use to fill random letters
    })

  //^^^^^^^^^Fetches Codes and Shovels them into the codeLibrary Array^^^^^^^^^
  //^^^^^^^Calls the codeFilter function to start filtering the codes into the corresponding array^^^^^^^
  bathTubeImage = loadImage('./ducks/bathtime.png'); //

  createCanvas(windowWidth - 10, windowHeight - 90);
  fill(0, 0, 0)
  ducksArray = {
    currentDiff: ['', '', '', '', '', ''],
    currentWords: ['', '', '', '', '', ''],
    xLocations: [(width / 6) * 1.5, (width / 6) * 3, (width / 6) * 4.5, (width / 6) * 1.5, (width / 6) * 3, (width / 6) * 4.5],
    yLocations: [(height / 4) * 1.3, (height / 4) * 1.1, (height / 4) * 1.2, (height / 4) * 2.5, (height / 4) * 2.4, (height / 4) * 2.6]
  }
}

function fillRandomItem(codeObj) { //fills ducksArray with random word
  let randomNumber = Math.floor(Math.random() * ducksArray['currentWords'].length)
  if (ducksArray['currentWords'][randomNumber].length === 0) {
    ducksArray['currentWords'][randomNumber] = codeObj.code
    ducksArray['currentDiff'][randomNumber] = codeObj.category.difficulty

    return true
  } else {
    return false
  }
}

function draw() {
  textAlign(CENTER);
  // put drawing code here
  if (scene == 1) { //start screen
    image(startScreenLogo, width / 2, height / 2);
    if (key == ' ') {
      gameStartTime = millis()
      scene = 2
    }
  } else if (scene == 2) { //game play screen
    image(bathTubeImage, width / 2, height / 2);
    text((lastEnteredWord.join('')), width / 2, height / 2);
    drawDucks()
    addDuckTimer()

    textAlign(LEFT);
    displayPoints()
    gameTimeLeft()
    noDuckCheck()

  } else if (scene == 3) { //game over screen
    background(255)
    image(gameOverImage, width / 2, height / 2)
    textSize(32)
    text('Points: ' + points, (width / 2), height / 4);
    // textSize(64)
    // text('Game Over', (width / 2), height / 2);
  }
}

function noDuckCheck() {
  let wordCount = 0
  ducksArray["currentWords"].forEach(word => {
    if (word.length > 0) {
      wordCount += 1
    }
  });
  if (wordCount == 0) {
    // addStringToScreen()
  }
}

function displayedWordCount() {
  let wordCount = 0
  ducksArray['currentWords'].forEach(word => {
    if (word.length > 0) {
      wordCount += 1
    }
  });
  return wordCount
}

function drawDucks() {
  for (let i = 0; i < ducksArray["currentWords"].length; i++) {
    if (ducksArray["currentWords"][i].length > 0) {
      fill(0)

      if (lastEnteredWord.join('') == ducksArray["currentWords"][i]) {
        fill(150, 203, 92);
        if (key == 'Enter') {
          ducksArray["currentWords"][i] = ''
        }
      }
      // console.log(ducksArray['currentDiff']);
      if (ducksArray['currentDiff'][i] == 'easy') {
        image(yellowDuckImage, ducksArray["xLocations"][i], ducksArray["yLocations"][i], 50, 50)
      } else {
        image(redDuckImage, ducksArray["xLocations"][i], ducksArray["yLocations"][i], 50, 50)
      }

      text(ducksArray["currentWords"][i], ducksArray["xLocations"][i], ducksArray["yLocations"][i] + 50);
      // fill(0, 255, 0)
      // text((lastEnteredWord.join('')), width / 2, height / 2);
      // text((lastEnteredWord.join('')), ducksArray["xLocations"][i], ducksArray["yLocations"][i] + 50);
    }

  }
}

function addDuckTimer() {
  // fillRandomItem(pullRandomCode(easyCodeArray)) //use to fill random letters
  // console.log((displayedWordCount()), 'nowords');

  if (millis() > timeOfLastDuck + timeBetweenDucks || (millis() > 5000 && displayedWordCount() < 1)) {
    if (fillRandomItem(pullRandomCode())) { //use to fill random letters
      timeOfLastDuck = millis()
    }
  }
}

function displayPoints() {
  fill(0, 0, 0)
  text('Points: ' + points, 50, 50)
}

function gameTimeLeft() {
  fill(0, 0, 0)
  let timeLeft = Math.floor(60 - (millis() - gameStartTime) / 1000)
  text('Time: ' + timeLeft, 50, 100)
  if (timeLeft < 1 || displayedWordCount() > 5) {
    textAlign(CENTER)
    scene = 3
  }
}

let removeWord = (wordToRemove) => {
  if (wordToRemove.length > 0) {
    let wordToRemoveIndex = ducksArray["currentWords"].indexOf(wordToRemove.join(''))
    if (wordToRemoveIndex > -1) {

      ducksArray["currentWords"][wordToRemoveIndex] = ''
      if (ducksArray["currentDiff"][wordToRemoveIndex] === 'easy') {
        points += 2
      } else {
        points += 5
      }
    }
  }
}

function keyPressed() {
  if (key == 'Backspace') {
    lastEnteredWord.pop()
  }
  if (key.length < 2) {
    lastEnteredWord.push(key)
  }
  if (key === 'Enter') {
    removeWord(lastEnteredWord)
    lastEnteredWord = []
  }

}