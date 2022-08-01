import Notiflix from 'notiflix';

const form = document.querySelector('form');
const input = document.querySelectorAll('input');
const submit = document.querySelector('button');

form.style.display = 'flex';
form.style.flexDirection = 'row';
form.style.flexWrap = 'wrap';
form.style.alignItems = 'flex-end';
submit.style.height = '22px';
submit.style.marginTop = '10px';

input.forEach(el => {
  el.style.display = 'flex';
});
input.forEach(el => {
  el.style.flexDirection = 'column';
});
input.forEach(el => {
  el.style.alignItems = 'start';
});
input.forEach(el => {
  el.style.marginRight = '10px';
});

form.addEventListener('submit', submitClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function submitClick(event) {
  event.preventDefault();

  let delay = Number(input[0].value);
  let step = Number(input[1].value);
  let amount = Number(input[2].value);
  console.log(input[0].value);
  console.log(input[1].value);
  console.log(input[2].value);

  for (let i = 1; i <= amount; i += 1) {
    delay += step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
