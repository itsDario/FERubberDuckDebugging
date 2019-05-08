let lastEnteredWord = []
let enteredString = []
let success = ''
let ducksArray
let codeLibrary = []
let randomCode
let easyCodeArray = []
let hardCodeArray = []
let yellowDuckImage
let redDuckImage
let bathTubeImage
let timeOfLastDuck = 0
let timeBetweenDucks = 4000
let points = 0 //number of ducks successfully entered 

//python -m SimpleHTTPServer  to host a local server

function pullRandomCode(difficultyCodeArray) {
  //pull new word thats not on screen already
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
    currentWords: ['', '', '', '', '', ''],
    xLocations: [(width / 6) * 1.5, (width / 6) * 3, (width / 6) * 4.5, (width / 6) * 1.5, (width / 6) * 3, (width / 6) * 4.5],
    yLocations: [(height / 4) * 1, (height / 4) * 1, (height / 4) * 1, (height / 4) * 2.5, (height / 4) * 2.5, (height / 4) * 2.5]
  }
}

function fillRandomItem(codeObj) { //fills ducksArray with random word
  randomNumber = Math.floor(Math.random() * ducksArray['currentWords'].length)

  ducksArray['currentWords'][randomNumber] = codeObj.code
}

function draw() {
  textAlign(CENTER);
  // put drawing code here
  image(bathTubeImage, width / 2, height / 2);

  text((lastEnteredWord.join('')), width / 2, height / 2);
  drawDucks()
  addDuckTimer()
  textAlign(LEFT);
  displayPoints()
  gameTimeLeft()
}

function drawDucks() {
  for (let i = 0; i < ducksArray["currentWords"].length; i++) {
    if (ducksArray["currentWords"][i].length > 0) {

      if (lastEnteredWord.join('') == ducksArray["currentWords"][i]) {
        fill(150, 203, 92);
        if (key == 'Enter') {
          ducksArray["currentWords"][i] = ''
        }
      }

      image(yellowDuckImage, ducksArray["xLocations"][i], ducksArray["yLocations"][i], 50, 50)
      fill(255, 255, 255)
      text(ducksArray["currentWords"][i], ducksArray["xLocations"][i], ducksArray["yLocations"][i] + 50);
    }

  }
}

function addDuckTimer() {
  // fillRandomItem(pullRandomCode(easyCodeArray)) //use to fill random letters
  if (millis() > timeOfLastDuck + timeBetweenDucks) {
    fillRandomItem(pullRandomCode(easyCodeArray)) //use to fill random letters
    timeOfLastDuck = millis()
  }
}

function displayPoints() {
  fill(0, 0, 0)
  text('Points: ' + points, 50, 50)
}

function gameTimeLeft() {
  fill(0, 0, 0)
  text('Time: ' + Math.floor(60 - (millis() / 1000)), 50, 100)
  if (millis() / 1000 > 60) {
    textAlign(CENTER)
    text('Game Over ' + points, (width / 2), (height / 2) - 50);
  }
}

let removeWord = (wordToRemove) => {
  let wordIndex = ducksArray["currentWords"].indexOf(wordToRemove.join(''))
  ducksArray["currentWords"][wordIndex] = ''
  points += 1
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