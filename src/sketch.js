var lastEnteredWord = []
var wordArr = ['test', 'word']
var success = ''

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // put drawing code here
  background(255)
  // fill(000000)
  ellipse(50, 50, 50, 50)
  text((lastEnteredWord.join('')), 10, 30);
  text((success), 10, 30);
}

// function key_pressed() {
//   console.log('keypress', key);
// }

function keyPressed() {
  lastEnteredWord.push(key)
  if (key == ' ' || key === 'Enter') {
    // console.log('space');
    lastEnteredWord = []
  }
  console.log(wordArr.indexOf(lastEnteredWord.join('')));

  // if ((searchStringInArray(lastEnteredWord.join(''), wordArr) > -1) && ) {
  // success = 'Success'
  // }
  // console.log(lastEnteredWord.join(''));
}