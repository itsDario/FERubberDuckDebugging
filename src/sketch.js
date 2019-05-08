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

//python -m SimpleHTTPServer  to host a local server

function pullRandomCode(difficultyCodeArray) {
  randomCode = difficultyCodeArray[Math.floor(Math.random() * difficultyCodeArray.length)];
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
        // debugger
        // fillRandomItem()
      })
      codeFilter()
      fillRandomItem(pullRandomCode(easyCodeArray)) //use to fill random letters
    })

  //^^^^^^^^^Fetches Codes and Shovels them into the codeLibrary Array^^^^^^^^^
  //^^^^^^^Calls the codeFilter function to start filtering the codes into the corresponding array^^^^^^^
   bathTubeImage = loadImage('./ducks/bathtime.png');//

  createCanvas(windowWidth - 10, windowHeight - 90);
  fill(0, 0, 0)
  textAlign(CENTER);
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
  // put drawing code here
    image(bathTubeImage, width/2, height/2);

  // background(80, 10, 190) //white background
  text((lastEnteredWord.join('')), width / 2, height / 2);
  drawDucks()
  addDuckTimer()
}

function drawDucks() {
  for (let i = 0; i < ducksArray["currentWords"].length; i++) {
    if (ducksArray["currentWords"][i].length > 0) {

      // console.log(enteredString == ducksArray["currentWords"][i], key == 'Enter');
      // console.log(enteredString.join(''));
      if (lastEnteredWord.join('') == ducksArray["currentWords"][i]) {
        fill(150, 203, 92);
        if (key == 'Enter') {
          ducksArray["currentWords"][i] = ''
        }
      }
      if (enteredString.join('') == ducksArray["currentWords"][i] && key == 'Enter') {
        debugger
      }

      image(yellowDuckImage, ducksArray["xLocations"][i], ducksArray["yLocations"][i], 50, 50)
      text(ducksArray["currentWords"][i], ducksArray["xLocations"][i], ducksArray["yLocations"][i] + 50);
    }

    fill(255, 255, 255)
  }
}

function addDuckTimer() {
  // fillRandomItem(pullRandomCode(easyCodeArray)) //use to fill random letters
  if (millis() > timeOfLastDuck + timeBetweenDucks) {
    fillRandomItem(pullRandomCode(easyCodeArray)) //use to fill random letters
    timeOfLastDuck = millis()
  }
}

let removeWord = (wordToRemove) => {
  let wordIndex = ducksArray["currentWords"].indexOf(wordToRemove.join(''))
  ducksArray["currentWords"][wordIndex] = ''
}

function keyPressed() {
  // console.log(key.length);
  if (key == 'Backspace') {
    lastEnteredWord.pop()
  }
  if (key.length < 2) {
    lastEnteredWord.push(key)
  }
  if (key === 'Enter') {
    // enteredString = lastEnteredWord
    removeWord(lastEnteredWord)
    lastEnteredWord = []
  }

  // console.log(ducksArray["currentWords"].indexOf(lastEnteredWord.join('')));
  // if (ducksArray["currentWords"].indexOf(lastEnteredWord.join('')) > -1) {
  //   fill(255, 204, 0);
  // } else {
  //   fill(255, 0, 0)
  // }
}
