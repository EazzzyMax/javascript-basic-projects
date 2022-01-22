const square = document.querySelector('.color-square');
const dx = square.offsetLeft;
const dy = square.offsetTop;
const arrow = document.querySelector('.arrow');
const arrowSize = arrow.offsetHeight;
let arrowX;
let arrowY;
let counter = 1;
const maxx = square.offsetWidth - 1;
const maxy = square.offsetHeight - 1;
let hue;
let saturation;
// square.addEventListener('mousemove', changeColor);

let timeout; //вылет за поле костыль

//events for dragging
square.addEventListener('mousedown', function (e) {
  manualDrag(e);
  startDrag();
});
square.addEventListener('mouseup', function () {
  stopDrag();
});
arrow.addEventListener('mouseup', function () {
  stopDrag();
});
square.addEventListener('mouseout', function () {
  timeout = setTimeout(stopDrag, 500);
});
square.addEventListener('mousemove', function () {
  clearTimeout(timeout);
});

//functions
function startDrag() {
  square.addEventListener('mousemove', manualDrag);
  square.classList.add('drag');
}
function stopDrag() {
  square.removeEventListener('mousemove', manualDrag);
  square.classList.remove('drag');
}

function manualDrag(e) {
  // let x = e.clientX - dx;
  // let y = e.clientY - dy;
  // const maxX = square.offsetWidth - 1;
  // const maxY = square.offsetHeight - 1;
  // let x1 = ((x / maxX) * 360) / counter;
  // let y1 = (y / maxY) * 40 + 30;

  // const arrowSize = arrow.offsetHeight;
  // arrow.style.left = `${e.clientX - arrowSize / 2}px`;
  // arrow.style.top = `${e.clientY - arrowSize / 2}px`;
  // document.querySelector('.txt-color').textContent = `${Math.floor(x1)}° ${Math.floor(y1)}%`;
  // square.style.backgroundColor = `hsl(${x1},${y1}%,50%)`;

  //new
  moveArrow(e);
  changeMainColor();
  changeExtraColors();
}

function moveArrow(e) {
  arrowX = e.clientX;
  arrowY = e.clientY;
  arrow.style.left = `${arrowX - arrowSize / 2}px`;
  arrow.style.top = `${arrowY - arrowSize / 2}px`;
}

function replaceArrow(increase) {
  
}

function changeMainColor() {
  hue = (((arrowX - dx) / maxx) * 360) / counter;
  saturation = ((arrowY - dy) / maxy) * 30 + 50;
  square.style.backgroundColor = `hsl(${hue},${saturation}%,50%)`;
  document.querySelector('.txt-color').textContent = `hsl(${Math.floor(hue)},${Math.floor(saturation)}%,50%)`;
}

function changeExtraColors() {
  const items = document.querySelectorAll('.item');
  items.forEach(function (child) {
    if (!child.classList.contains('hide')) {
      console.log(child);
      const hueStep = 360 / counter;
      let extraHue = (child.id - 1) * hueStep + hue;
      child.style.backgroundColor = `hsl(${extraHue},${saturation}%,50%`;
    }
  });
}

//счетчик
const minusBtn = document.querySelector('.decrease');
const plusBtn = document.querySelector('.increase');

minusBtn.addEventListener('click', decrease);
plusBtn.addEventListener('click', increase);

function decrease() {
  if (counter > 1) {
    deleteItem();
    counter--;
    console.log(counter);
  }
}

function increase() {
  if (counter < 6) {
    createItem();
    counter++;
    console.log(counter);
  }
}

// контейнер и дети
const container = document.querySelector('.rec-container');

function deleteItem() {
  item = document.getElementById(`${counter + 1}`);
  container.removeChild(item);
  document.getElementById(counter).classList.add('hide');
}

function createItem() {
  const item = document.createElement('div');
  item.classList.add('item');
  item.classList.add('hide');
  item.id = counter + 2;
  container.appendChild(item);

  document.getElementById(counter + 1).classList.remove('hide');
}
