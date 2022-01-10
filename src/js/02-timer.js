import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStartElement = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

btnStartElement.setAttribute('disabled', true);

let pickDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickDate = selectedDates[0].getTime();
    if (pickDate < Date.now()) {
      window.alert('Please choose a date in the future');
    } else {
      btnStartElement.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  day.textContent = String(days).padStart(2, '0');
  hour.textContent = String(hours).padStart(2, '0');
  minute.textContent = String(minutes).padStart(2, '0');
  second.textContent = String(seconds).padStart(2, '0');
}

let totalMs = 0;

btnStartElement.addEventListener('click', () => {
  const timerId = setInterval(() => {
    totalMs = pickDate - Date.now();
    // console.log(totalMs);
    addLeadingZero(convertMs(totalMs));
  }, 1000);
});
