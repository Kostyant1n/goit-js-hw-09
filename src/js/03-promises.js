import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayFirst = document.querySelector('input[name=delay]');
const delayStep = document.querySelector('input[name=step]');
const amounts = document.querySelector('input[name=amount]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const amount = +amounts.value;
  const firstDelay = +delayFirst.value;
  const stepDelay = +delayStep.value;

  let delay = firstDelay;
  for (let position = 1; position <= amount; ++position) {
    if (position !== 1) {
      delay += stepDelay;
    } else {
      delay;
    }

    function createPromise(position, delay) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          let shouldResolve = Math.random() > 0.3;
          if (shouldResolve) {
            res({ position, delay });
          } else {
            rej({ position, delay });
          }
        }, delay);
      });
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
