const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');

const items = document.querySelectorAll('.deadline-format h4');

let date = new Date();

const tempYear = date.getFullYear();
const tempMonth = date.getMonth();
const tempDate = date.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDate + 10, 11, 30, 0);

const weekdayName = weekdays[futureDate.getDay()];
const year = futureDate.getFullYear();
const monthName = months[futureDate.getMonth()];
const day = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

console.log(futureDate);

giveaway.textContent = `
giveaway ends on ${weekdayName}, ${day} ${monthName} ${year}, ${hours}:${minutes}am 
`;

// calculate

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  const oneDay = 1000 * 3600 * 24;
  const oneHour = 1000 * 3600;
  const oneMinute = 1000 * 60;
  const oneSecond = 1000;

  const days = Math.floor(t / oneDay);
  const hours = Math.floor((t % oneDay) / oneHour);
  const minutes = Math.floor((t % oneHour) / oneMinute);
  const second = Math.floor((t % oneMinute) / oneSecond);

  const value = [days, hours, minutes, second];

  function format(item) {
    if (item >= 10) {
      return `${item}`;
    } else {
      return `0${item}`;
    }
  }

  items.forEach((item, index) => {
    item.innerHTML = format(value[index]);
  });

  console.log(days, hours, minutes, second);
}

getRemainingTime();
let countdown = setInterval(getRemainingTime, 1000);
