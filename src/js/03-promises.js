import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const formInput = document.querySelectorAll('.input');

formEl.addEventListener('submit', submitClick);

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
  let delay = Number(formInput[0].value);
  let delayStep = Number(formInput[1].value);
  let amount = Number(formInput[2].value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delay += delayStep;
  }
}
