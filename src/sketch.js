let lastEnteredWord = []
let success = ''
let ducksArray
let codeLibrary = []
let randomCode
let easyCodeArray = []
let hardCodeArray = []
let yellowDuckImage
let redDuckImage

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
  // put setup code here
  yellowDuckImage = loadImage('ducks/yellow.png')
  redDuckImage = loadImage('ducks/red.png')
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

  createCanvas(windowWidth - 10, windowHeight - 90);
  fill(255, 0, 0)
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
  background(80, 10, 190) //white background
  text((lastEnteredWord.join('')), width / 2, height / 2); //render words by combinig letter array
  drawDucks()
  // addDuckTimer()
}

function drawDucks() {
  for (let i = 0; i < ducksArray["currentWords"].length; i++) {
    if (ducksArray["currentWords"][i].length > 0) {

      if (lastEnteredWord.join('') == ducksArray["currentWords"][i]) {
        fill(255, 204, 0);
      }

      // image(yellowDuckImage, 50, 50,50,50);
      image(yellowDuckImage, ducksArray["xLocations"][i], ducksArray["yLocations"][i], 50, 50)
      text(ducksArray["currentWords"][i], ducksArray["xLocations"][i], ducksArray["yLocations"][i] + 50);
    }

    fill(255, 0, 0)
  }
}

function addDuckTimer() {
  fillRandomItem(pullRandomCode(easyCodeArray)) //use to fill random letters

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
    // console.log('space');
    lastEnteredWord = []
  }

  // console.log(ducksArray["currentWords"].indexOf(lastEnteredWord.join('')));
  // if (ducksArray["currentWords"].indexOf(lastEnteredWord.join('')) > -1) {
  //   fill(255, 204, 0);
  // } else {
  //   fill(255, 0, 0)
  // }
}