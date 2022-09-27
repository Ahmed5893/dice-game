"use strict";
const cube = document.getElementById("cube");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");
const buttonNew = document.querySelector(".btn--new");
const buttonRules = document.querySelector(".btn--rule");
const rules = document.querySelector(".rules");
const card = document.querySelector(".card");
const player1 = document.getElementById("player-0");
const player2 = document.getElementById("player-1");
let currentScore0 = document.getElementById("currentScore-player0");
let currentScore1 = document.getElementById("currentScore-player1");
let scorePlayer0 = document.getElementById("score-player0");
let scorePlayer1 = document.getElementById("score-player1");
let scores, currentScore, player, playing;
const min = 1;
const max = 24;
const newGame = function () {
  scores = [0, 0];
  currentScore = 0;
  player = 0;
  playing = true;

  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player1.classList.remove("winner");
  player2.classList.remove("winner");
  player1.classList.remove("player-inactive");
  player2.classList.add("player-inactive");
  cube.style.visibility = "visible";
};

newGame();

const switchPlayer = function () {
  document.getElementById(`currentScore-player${player}`).textContent = 0;
  currentScore = 0;
  player = player === 0 ? 1 : 0;
  document.getElementById(`currentScore-player${player}`).textContent =
    currentScore;
  player1.classList.toggle("player-inactive");
  player2.classList.toggle("player-inactive");
};
const roll = function () {
  if (playing) {
    let xRand = Math.trunc(Math.random() * (max - min) + 1) * 90;
    let yRand = Math.trunc(Math.random() * (max - min) + 1) * 90;
    cube.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg)`;
    setTimeout(showResult, 5000);
    function showResult() {
      let result = getResult(xRand, yRand);
      if (result !== 1) {
        currentScore += result;
        document.getElementById(`currentScore-player${player}`).textContent =
          currentScore;
      } else {
        switchPlayer();
      }
    }
  }
};

buttonRoll.addEventListener("click", roll);

function mod(n, m) {
  return ((n % m) + m) % m;
}

function getResult(xRand, yRand) {
  let countX = mod(xRand / 90, 4);
  if (countX === 1) {
    return 6;
  }
  if (countX === 3) {
    // Top face
    return 5;
  }
  // We add countX here to correctly offset in case it is a 180 degrees rotation

  let countY = mod(yRand / 90 + countX, 4);
  // Faces order
  return [1, 4, 2, 3][countY];
}
const hold = function () {
  if (playing) {
    scores[player] += currentScore;
    document.getElementById(`score-player${player}`).textContent =
      scores[player];
    document.getElementById(`currentScore-player${player}`).textContent = 0;

    if (scores[player] >= 100) {
      playing = false;
      document.getElementById(`player-${player}`).classList.add("winner");
      cube.style.visibility = "hidden";
    } else switchPlayer();
  }
};

const showRules=function(player) {

rules.classList.toggle("rules");
}
buttonHold.addEventListener("click", hold);

buttonNew.addEventListener("click", newGame);

buttonRules.addEventListener("click",showRules);