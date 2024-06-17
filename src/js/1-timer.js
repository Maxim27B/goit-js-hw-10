import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  daysElem: document.querySelector('[data-days]'),
  hoursElem: document.querySelector('[data-hours]'),
  minutesElem: document.querySelector('[data-minutes]'),
  secondsElem: document.querySelector('[data-seconds]'),
}

refs.btn.disabled = true;
let userSelectedDate;
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
   onClose(selectedDates) {
     if (selectedDates[0] > Date.now()) {
       userSelectedDate = selectedDates[0];
       refs.btn.disabled = false;
     } else {
       iziToast.error({
         title: 'Error',
         message: 'Please choose a date in the future',
         position: 'topCenter',
         backgroundColor: 'red',
         theme: 'dark',
         messageColor: 'white',
       });
       refs.btn.disabled = true;
     };
  },
})

let intervalId;
refs.btn.addEventListener('click', () => {
  const initDate = userSelectedDate;
  let diff;
  setTimeout(() => {
    clearInterval(intervalId);
    refs.input.disabled = false;
  }, initDate - Date.now())

  intervalId = setInterval(() => {
    const currentDate = Date.now();
    diff = initDate - currentDate;
    const time = convertMs(diff);
    getTime(time);
  }, 1000);

  refs.btn.disabled = true;
  refs.input.disabled = true;
})

function getTime({ days, hours, minutes, seconds }) {
  refs.daysElem.textContent = addLeadingZero(days);
  refs.hoursElem.textContent = addLeadingZero(hours);
  refs.minutesElem.textContent = addLeadingZero(minutes);
  refs.secondsElem.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  value = value.toString().padStart(2, 0);
  return value;
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}