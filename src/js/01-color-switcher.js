function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const btnStartElement = document.querySelector('[data-start]');
const btnStopElement = document.querySelector('[data-stop]');

let timerId = null;

btnStartElement.addEventListener('click', function () {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStartElement.setAttribute('disabled', true);
  btnStopElement.removeAttribute('disabled');
});

btnStopElement.addEventListener('click', () => {
  clearInterval(timerId);
  btnStartElement.removeAttribute('disabled');
  btnStopElement.setAttribute('disabled', true);
});
