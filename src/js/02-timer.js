import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

const timerValues = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');
const timerLabel = document.querySelectorAll('.label');
const timerValue = document.querySelectorAll('.value');
const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

const deadLine = flatpickr(dateInput, options);
console.log('Current date', Date());

let intervId = null;
let delta = 0;

startBtn.setAttribute('disabled', 'disabled');
startBtn.addEventListener('click', startTimerClick);
dateInput.addEventListener('input', datePickerClick);

timerValues.style.display = 'flex';
timerValues.style.flexDirection = 'row';
timerValues.style.justifyContent = 'start';
timerValues.style.marginTop = '15px';
timerField.forEach(el => {
  el.style.display = 'flex';
});
timerField.forEach(el => {
  el.style.flexDirection = 'column';
});
timerField.forEach(el => {
  el.style.alignItems = 'center';
});
timerField.forEach(el => {
  el.style.marginRight = '15px';
});
timerLabel.forEach(el => {
  el.style.fontSize = '15px';
});
timerValue.forEach(el => {
  el.style.fontSize = '30px';
});

function datePickerClick() {
  if (deadLine.selectedDates[0] > Date.now()) {
    startBtn.removeAttribute('disabled', 'disabled');
  }
}

function startTimerClick() {
  if (deadLine.selectedDates[0] > Date.now()) {
    delta = convertMs(deadLine.selectedDates[0] - Date.now());
    startBtn.setAttribute('disabled', 'disabled');
    dateInput.setAttribute('disabled', 'disabled');
    daysElement.textContent = delta.days;
    hoursElement.textContent = delta.hours;
    minutesElement.textContent = delta.minutes;
    secondsElement.textContent = delta.seconds;
    intervId = setInterval(startTimerClick, 1000);
  } else {
    clearInterval(intervId);
    startBtn.removeAttribute('disabled', 'disabled');
    dateInput.removeAttribute('disabled', 'disabled');
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
