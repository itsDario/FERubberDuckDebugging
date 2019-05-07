let lastEnteredWord = []
let wordArr = ['test', 'word']
let success = ''

function setup() {
  // put setup code here
  createCanvas(windowWidth - 10, windowHeight - 90);
  textAlign(CENTER);
}

function draw() {
  // put drawing code here
  background(80, 10, 190) //white background 
  ellipse(width / 2, height / 2, 50, 50) //testing circle
  text((lastEnteredWord.join('')), width / 2, height / 2); //render words by combinig letter array
  displayCurrentWords()
}

function displayCurrentWords() {

  text(wordArr.join(', '), width / 2, (height / 2) + 50);
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

  // console.log(wordArr.indexOf(lastEnteredWord.join('')));
  if (wordArr.indexOf(lastEnteredWord.join('')) === -1) {
    fill(255, 204, 0);
  } else {
    noFill();
  }
  fill(0)
}