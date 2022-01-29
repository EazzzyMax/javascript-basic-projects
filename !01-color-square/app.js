//form
let step = 180;
let brightness = 50;
const stepForm = document.getElementById('step');
const brightnessForm = document.getElementById('brightness');
const sectorForm = document.getElementById('colorSector');

stepForm.addEventListener('input', changeStep);
sectorForm.addEventListener('input', changeColorWheelSector);
brightnessForm.addEventListener('input', changeBrightness);

//square
let square = document.querySelector('.color-square');
let dx = square.offsetLeft;
let dy = square.offsetTop;
let arrow = document.querySelector('.arrow-color');
let arrowSize = arrow.offsetHeight;
let arrowX;
let arrowY;
let counter = 2;
let maxx = square.offsetWidth - 1;
let maxy = square.offsetHeight - 1;
let hue;
let saturation;

//без учета ресайза квадрат выходит за диапазон HSL
window.addEventListener('resize', function () {
  dx = square.offsetLeft;
  dy = square.offsetTop;
  arrowSize = arrow.offsetHeight;
  maxx = square.offsetWidth - 1;
  maxy = square.offsetHeight - 1;
});

//изменение шага
function changeStep() {
  console.log('step');
  step = stepForm.value;
  if (step > 360 / counter) {
    step = 360 / counter;
    stepForm.value = step;
  }
  sectorForm.value = counter * step;
  changeExtraColors();
}
//изменение шага через размер сектора цветов
function changeColorWheelSector() {
  step = sectorForm.value / counter;
  stepForm.value = step;
  changeExtraColors();
}
//изменение яркости
function changeBrightness() {
  brightness = brightnessForm.value;
  changeMainColor();
  changeExtraColors();
}

//events for dragging
square.addEventListener('mousedown', function (e) {
  manualDrag(e);
  startDrag();
});
window.addEventListener('mouseup', function () {
  stopDrag();
});

//functions for dragging
function startDrag() {
  window.addEventListener('mousemove', manualDrag);
  square.classList.add('drag');
}
function stopDrag() {
  if (square.classList.contains('drag')) {
    window.removeEventListener('mousemove', manualDrag);
    square.classList.remove('drag');
  }
}

function manualDrag(e) {
  moveArrow(e);
  changeMainColor();
  changeExtraColors();
}

function moveArrow(e) {
  arrowX = e.clientX;
  if (arrowX < dx) {
    arrowX = dx;
  }
  else if (arrowX > dx + maxx) {
    arrowX = dx + maxx;
  }

  arrowY = e.clientY;
  if (arrowY < dy) {
    arrowY = dy;
  }
  else if (arrowY > dy + maxy) {
    arrowY = dy + maxy;
  }

  console.log(`dx ${dx}, dy ${dy}, maxx ${maxx}, maxy ${maxy}`);
  console.log(`arrowX${arrowX}, arrowY ${arrowY}`);

  arrow.style.left = `${arrowX - arrowSize / 2}px`;
  arrow.style.top = `${arrowY - arrowSize / 2}px`;
}

function changeMainColor() {
  hue = ((arrowX - dx) / maxx) * 360;
  saturation = ((arrowY - dy) / maxy) * 50 + 30;
  square.style.backgroundColor = `hsl(${hue},${saturation}%,${brightness}%)`;
  document.querySelector('.txt-color').textContent = `hsl(${Math.floor(hue)},${Math.floor(saturation)}%,50%)`;
}

function changeExtraColors() {
  const items = document.querySelectorAll('.item');
  items.forEach(function (child) {
    if (!child.classList.contains('hide')) {
      let extraHue = (child.id - 1) * step + hue;
      child.style.backgroundColor = `hsl(${extraHue},${saturation}%,${brightness}%`;
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
  changeExtraColors();
  changeColorWheelSector();
}

function increase() {
  if (counter < 6) {
    createItem();
    counter++;
    console.log(counter);
  }
  changeExtraColors();
  changeColorWheelSector();
}

// container and items
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
