const startBtn = document.getElementById("start-btn");
const clickArea = document.getElementById("click-area");
const clicksSpan = document.getElementById("clicks");
const cpsSpan = document.getElementById("cps");
const messageDiv = document.getElementById("message");
const timeLeftSpan = document.getElementById("time-left");

let clicks = 0;
let cps = 0;
let startTime = 0;
let endTime = 0;
let timeLeft = 10;
let timerIntervalId;
let cpsIntervalId;

function startTimer() {
  clicks=0;
  cps=0;
  let timeLeft = 10;
  startBtn.disabled = true;
  startTime = new Date().getTime();
  endTime = startTime + timeLeft * 1000;
  timerIntervalId = setInterval(updateTimer, 100);
  clickArea.addEventListener("click", handleClick);
  messageDiv.textContent = "";
  clicksSpan.textContent = "0";
  cpsSpan.textContent = "0";
  cpsIntervalId = setInterval(updateCPS, 300);
}

function updateTimer() {
  const currentTime = new Date().getTime();
  timeLeft = Math.floor((endTime - currentTime) / 1000);
  timeLeftSpan.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerIntervalId);
    clearInterval(cpsIntervalId);
    clickArea.removeEventListener("click", handleClick);
    messageDiv.textContent = `Time's up! You clicked ${clicks} times at a rate of ${cps.toFixed(2)} clicks per second.`;
    startBtn.disabled = false;
  }
}

function handleClick() {
  clicks++;
  clicksSpan.textContent = clicks;
}

function updateCPS() {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;
  cps = clicks / elapsedTime;
  cpsSpan.textContent = cps.toFixed(2);
}

startBtn.addEventListener("click", startTimer);
