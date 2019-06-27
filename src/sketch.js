let lastEnteredWord = []
let success = ''
let ducksArray
let codeLibrary = []
let easyCodeArray = []
let hardCodeArray = []
let gameStartTime
let yellowDuckImage
let redDuckImage
let startScreenLogo
let bathTubeImage
let timeOfLastDuck = 0
let timeBetweenDucks = 5000
// let timeBetweenDucks = 16000//test timing
let points = 0 //number of ducks successfully entered
let scene = 1
let gameOverImage
let finalScores = []
finalScores['a'] = 25
finalScores['b'] = 20
finalScores['c'] = 15

//python -m SimpleHTTPServer  to host a local server

function pullRandomCode() {
  //pull new word thats not on screen already
  let randomCode
  let randomN = Math.random()
  let difficultyCodeArray = easyCodeArray

  if (randomN < 0.8) { //normal
    // if (true) { //easy
    // if (false) { //hard
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
  // textSize(24)
  gameOverImage = loadImage("./ducks/emptytubgameover.png")
  startScreenLogo = loadImage("./ducks/duckstart.png")
  yellowDuckImage = loadImage('./ducks/yellow.png')
  redDuckImage = loadImage('./ducks/red.png')

  fetch("https://rubber-duck-debugging-be.herokuapp.com/words")
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
    xLocations: [
      (width / 6) * 1.6, (width / 6) * 3, (width / 6) * 4.4,
      (width / 6) * 1.6, (width / 6) * 3, (width / 6) * 4.4
    ],
    yLocations: [
      (height / 4) * 1.8, (height / 4) * 1.4, (height / 4) * 1.6,
      (height / 4) * 2.4, (height / 4) * 2.2, (height / 4) * 2.6
    ]
  }
  Mode(CENTER);

  //disable default actions
  document.addEventListener('keydown', function (event) {
    event.preventDefault()
  });
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
  textSize(32)
  textAlign(CENTER);
  if (scene == 1) {
    background(255)
    image(startScreenLogo, width / 2, height / 2);
  } else if (scene == 2) { //game play screen
    image(bathTubeImage, width / 2, height / 2);
    text((lastEnteredWord.join('')), width / 2, height / 2);
    drawDucks()
    addDuckTimer()

    textSize(32)
    textAlign(LEFT);
    displayPoints()
    gameTimeLeft()
    noDuckCheck()

  } else if (scene == 3) { //game over screen
    background(255)
    image(gameOverImage, width / 2, height / 2)
    textSize(32)
    text('Points: ' + points, (width / 2), height / 4);
  } else if (scene == 4) { //game over screen
    background(255)
    text('leaderboard', width / 2, height / 2)
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
      if (ducksArray['currentDiff'][i] == 'easy') {
        image(yellowDuckImage, ducksArray["xLocations"][i], ducksArray["yLocations"][i], 50, 50)
      } else {
        image(redDuckImage, ducksArray["xLocations"][i], ducksArray["yLocations"][i], 50, 50)
      }

      text(ducksArray["currentWords"][i], ducksArray["xLocations"][i], ducksArray["yLocations"][i] + 50);
    }
  }
}

function addDuckTimer() {

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
    key = ''
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

let displayLeaderBoard = () => {
  console.log(finalScores);
  console.log(finalScores.keys);
  // console.log(finalScores.sort(compare));
  // console.log(finalScores.keys);


}

// function compare(a, b) {
//   // Use toUpperCase() to ignore character casing
//   const scoreA = a.value
//   const scoreB = b.value

//   let comparison = 0;
//   if (scoreA > scoreB) {
//     comparison = 1;
//   } else if (gscoreA < scoreB) {
//     comparison = -1;
//   }
//   return comparison;
// }

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

function keyReleased() {
  if (scene === 1) { //start screen
    background(255)
    image(startScreenLogo, width / 2, height / 2);
    if (key === ' ') {
      gameStartTime = millis()
      points = 0
      scene = 2
      lastEnteredWord = []
      ducksArray['currentWords'] = ['', '', '', '', '', '']
      key = ''
    }

    if (key === 'b') {
      scene = 1
    }
  } else if (scene == 3) {
    if (key === ' ') {
      scene = 1
      key = ''
    } else if (key == 'l') {
      scene = 4
    }
  }
  if (scene == 4) { //for 2leaderboard
    displayLeaderBoard()

    if (key == ' ') {
      scene = 1
    }
  }
}