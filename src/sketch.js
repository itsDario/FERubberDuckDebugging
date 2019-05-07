let lastEnteredWord = []
let success = ''
let ducksArray

function setup() {
  // put setup code here
  createCanvas(windowWidth - 10, windowHeight - 90);
  fill(255, 0, 0)
  textAlign(CENTER);
  ducksArray = {
    currentWords: ['test', 'word', '', '', '', ''],
    xLocations: [(width / 6) * 1.5, (width / 6) * 3, (width / 6) * 4.5, (width / 6) * 1.5, (width / 6) * 3, (width / 6) * 4.5],
    yLocations: [(height / 4) * 1, (height / 4) * 1, (height / 4) * 1, (height / 4) * 2.5, (height / 4) * 2.5, 50, (height / 4) * 2.5]
  }
}

function draw() {
  // put drawing code here
  background(80, 10, 190) //white background 
  text((lastEnteredWord.join('')), width / 2, height / 2); //render words by combinig letter array
  displayCurrentWords()
  drawDucks()
}

function drawDucks() {
  for (let i = 0; i < ducksArray["currentWords"].length; i++) {
    if (ducksArray["currentWords"][i].length > 0) {

      if (lastEnteredWord.join('') == ducksArray["currentWords"][i]) {
        fill(255, 204, 0);
      }

      ellipse(ducksArray["xLocations"][i], ducksArray["yLocations"][i], 50, 50)
      text(ducksArray["currentWords"][i], ducksArray["xLocations"][i], ducksArray["yLocations"][i] + 50);
    }

    fill(255, 0, 0)
  }
}

function displayCurrentWords() {

  text(ducksArray["currentWords"].join(', '), width / 2, (height / 2) + 50);
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

  console.log(ducksArray["currentWords"].indexOf(lastEnteredWord.join('')));
  // if (ducksArray["currentWords"].indexOf(lastEnteredWord.join('')) > -1) {
  //   fill(255, 204, 0);
  // } else {
  //   fill(255, 0, 0)
  // }
}