import Notiflix from 'notiflix';

const form = document.querySelector('form');
const input = document.querySelectorAll('input');

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
