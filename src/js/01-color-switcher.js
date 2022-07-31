function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervId = null;

startBtn.style.width = '50px';
startBtn.style.height = '30px';
startBtn.style.border = '1px solid black';
startBtn.style.borderRadius = '2px';
startBtn.style.boxShadow = '0 5px 10px grey';
startBtn.style.marginLeft = '40%';
startBtn.style.marginTop = '10%';

stopBtn.style.width = '50px';
stopBtn.style.height = '30px';
stopBtn.style.border = '1px solid grey';
stopBtn.style.borderRadius = '2px';
stopBtn.style.boxShadow = '0 0 0 transparent';
stopBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);

function startChangeColor() {
  intervId = setInterval(bodyColor, 1000);
  startBtn.setAttribute('disabled', 'disabled');
  startBtn.style.border = '1px solid grey';
  startBtn.style.boxShadow = '0 0 0 transparent';
  stopBtn.removeAttribute('disabled', 'disabled');
  stopBtn.style.border = '1px solid black';
  stopBtn.style.borderRadius = '2px';
  stopBtn.style.boxShadow = '0 5px 10px grey';
}

function bodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function stopChangeColor() {
  clearInterval(intervId);
  stopBtn.setAttribute('disabled', 'disabled');
  stopBtn.style.border = '1px solid grey';
  stopBtn.style.boxShadow = '0 0 0 transparent';
  startBtn.removeAttribute('disabled', 'disabled');
  startBtn.style.border = '1px solid black';
  startBtn.style.borderRadius = '2px';
  startBtn.style.boxShadow = '0 5px 10px grey';
}
