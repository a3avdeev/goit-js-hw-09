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
  },
};

const dateInput = document.querySelector('#datetime-picker');
const finalDate = flatpickr('#datetime-picker', options);
console.log(dateInput);
console.log(finalDate.now);

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000));
// console.log(convertMs(140000));
// console.log(convertMs(24140000));

// // 1) Потрібно задати дедлайн
// // 2) Потрібно задати поточну дату
// // 3) Потрібно знайти їх різницю
// // 4) Різницю конвертувати в нормальний формат для користувача
// // 5) Відобразити це все на екрані

const deadline = new Date(2022, 9, 27);
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
function timer() {
  const today = new Date();
  const delta = deadline - today;
  const seconds = Math.floor(delta / 1000) % 60;
  const minutes = Math.floor(delta / 1000 / 60) % 60;
  const hours = Math.floor(delta / 1000 / 60 / 60) % 24;
  const days = Math.floor(delta / 1000 / 60 / 60 / 24);

  daysElement.textContent = days < 10 ? `0${days}` : days;
  hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
  minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

setInterval(timer, 1000);
