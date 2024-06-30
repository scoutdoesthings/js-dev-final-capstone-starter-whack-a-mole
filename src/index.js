const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const scoreDisplay = document.querySelector('#score'); 
const timerDisplay = document.querySelector('#timer');
const difficultySelect = document.querySelector('#difficulty');
const controls = document.querySelector('#controls');
const song = new Audio("../assets/mice_assets/paper.mp3");
const muteButton = document.querySelector('#mute');

let time = 60;
let timer;
let lastHole = null;
let points = 0;
let difficulty = "normal"; //Default difficulty
let isMuted = false;

const mouseImages = [
  '../assets/mice_assets/mouse.png',
  '../assets/mice_assets/mouse2.png',
  '../assets/mice_assets/vestmouse.png'
];

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  } 
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  let hole;
  do {
    const index = randomInteger(0, holes.length - 1);
    hole = holes[index];
    } while (hole === lastHole);

    lastHole = hole;
    return hole;
}

/**
* Calls the showUp function if time > 0 and stops the game if time = 0.
*/
function gameOver() {
  if(time > 0) {
    let timeoutId = showUp();
    return timeoutId;
  } else {
    let gameStopped = stopGame();
    return gameStopped;
}
}

function randomMouseImage() {
  const index = randomInteger(0, mouseImages.length - 1);
  return mouseImages[index];
}

/**
* Calls the showAndHide() function with a specific delay and a hole.
*/
function showUp() {
  let delay = setDelay(difficulty); // Use selected difficulty
  const hole = chooseHole(holes); 
  const mole = hole.querySelector('.mole');
  mole.style.backgroundImage = `url('${randomMouseImage()}')`;
  return showAndHide(hole, delay);
}

function showAndHide(hole, delay){
    toggleVisibility(hole);
  
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

function toggleVisibility(hole) {
  const mouse = hole.querySelector('.mole');
  if (!hole.classList.contains('show')) {
    mouse.style.backgroundImage = `url('${randomMouseImage()}')`;
  }
  hole.classList.toggle('show');
  return hole;
}

function updateScore() {
  points++;
  scoreDisplay.textContent = points;
  return points;
}

function clearScore() {
  points = 0;
  scoreDisplay.textContent = points;
  return points;
}

/**
* Updates the control board with the timer if time > 0
*/
function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  } else {
    clearInterval(timer);
    startButton.textContent = "Start"; // Change the button back to Start
  }
  return time;
}

/**
* Starts the timer using setInterval.
*/
function startTimer() {
    timer = setInterval(updateTimer, 1000);
    return timer;
  }

/**
* This is the event handler that gets called when a player
* clicks on a mole. 
*/
function whack(event) {
  if (event.target.classList.contains('mole')) {
    // Change to cat paw image
    event.target.style.backgroundImage = "url('../assets/mice_assets/cat_paw_sm.png')";
    updateScore();
  }
  return points;
}

/**
* Adds the 'click' event listeners to the moles.
*/
function setEventListeners() {
  moles.forEach(mole => mole.addEventListener('click', whack));
  return moles;
}

/**
* This function sets the duration of the game.
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
* This function is called when the game is stopped.
*/
function stopGame() {
  song.pause();
  song.currentTime = 0;
  clearInterval(timer);
  startButton.textContent = "Start"; // Change the button back to Start
  return "game stopped";
}

// MUTE BUTTON //

function toggleMute() {
  isMuted = !isMuted;
  if (isMuted) {
    song.pause();
    muteButton.textContent = 'Unmute';
  } else {
    song.play();
    muteButton.textContent = 'Mute';
  }
}

muteButton.addEventListener('click', toggleMute);


function playAudio(audio) {
  if (!isMuted) {
    audio.play();
  }
}

/**
* This is the function that starts the game when the `startButton`
* is clicked.
*/
// Update the startGame function to play the audio based on the mute state
function startGame() {
  setDuration(60);
  clearScore();
  startTimer();
  if (!isMuted) {
    playAudio(song);
  }
  showUp();
  setEventListeners();
  startButton.textContent = "Stop"; // Change the button to Stop
  return "game started";
}

// Add event listener for the start button
startButton.addEventListener("click", () => {
  console.log("Start button clicked!");
  difficulty = difficultySelect.value; // Get the selected difficulty
  console.log("Difficulty set to:", difficulty);
  startGame();
});

//Debugging console log to ensure event listener is set up
console.log("Event listener for start button set up!");


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
