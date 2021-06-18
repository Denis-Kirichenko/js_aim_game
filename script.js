const screens = document.querySelectorAll('.screen');
const btnStart = document.querySelector('.start');
const timeBtnList = document.querySelector('.time-list');
const timerDisplay = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [
  '#16d9e3',
  '#e3c416',
  '#e31616',
  '#50e316',
  '#1635e3',
  '#e316e3',
  '#e3166b',
];
let time = 0;
let score = 0;
let timerId;

btnStart.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeBtnList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = +event.target.getAttribute('data-time');
    screens[1].classList.add('up');
    gameStart();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function gameStart() {
  setTime(time);
  timerId = setInterval(decreaseTime, 1000);
  createRandomCircle();
}

function decreaseTime() {
  if (time == 0) {
    endGame();
  } else {
    let curent = --time;
    if (curent < 10) {
      curent = `0${curent}`;
    }
    setTime(curent);
  }
}

function setTime(value) {
  timerDisplay.innerHTML = `00: ${value}`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  const size = getRundomNumber(10, 50);
  const { height, width } = board.getBoundingClientRect();
  const x = getRundomNumber(0, width - size);
  const y = getRundomNumber(0, height - size);
  const color = getRundomColor();
  circle.style.background = `${color}`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  board.append(circle);
}

function getRundomColor() {
  return colors[getRundomNumber(0, colors.length)];
}

function getRundomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function endGame() {
  timerDisplay.parentNode.classList.add('hide');
  clearInterval(timerId);
  board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1></br><a  style="cursor: pointer;" onclick="reloadGame()">Начать заново</a>`;
}

function reloadGame() {
  timerDisplay.parentNode.classList.remove('hide');
  screens[0].classList.remove('up');
  screens[1].classList.remove('up');
  score = 0;
  board.innerHTML = '';
}
