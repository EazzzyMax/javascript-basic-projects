let hue;
let saturation;
//form
let step = 180;
let brightness = 50;
const stepForm = document.getElementById('step');
const brightnessForm = document.getElementById('brightness');
const sectorForm = document.getElementById('colorSector');

stepForm.addEventListener('input', changeStep);
sectorForm.addEventListener('input', changeColorWheelSector);
brightnessForm.addEventListener('input', changeBrightness);

//change step / brightness
function changeStep() {
  if (stepForm.value > 360 / counter) {
    step = 360 / counter;
    stepForm.value = step;
  }
  step = stepForm.value;
  sectorForm.value = counter * step;
  changeExtraColors();
}

function changeColorWheelSector() {
  step = sectorForm.value / counter;
  stepForm.value = step;
  changeExtraColors();
}

function changeBrightness() {
  brightness = brightnessForm.value;
  changeMainColor();
  changeExtraColors();
}

//square
let square = document.querySelector('.square');
let squareLeft = square.offsetLeft;
let squareTop = square.offsetTop;
let squareWidth = square.offsetWidth - 1;
let squareHight = square.offsetHeight - 1;

//arrow
let pointer = document.querySelector('.pointer-container');
let pointerSize = pointer.offsetHeight;
let pointerX;
let pointerY;

let counter = 2;

//if page resized
window.addEventListener('resize', function () {
  squareLeft = square.offsetLeft;
  squareTop = square.offsetTop;
  pointerSize = pointer.offsetHeight;
  squareWidth = square.offsetWidth - 1;
  squareHight = square.offsetHeight - 1;
});

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
  document.querySelector('body').classList.add('drag');
}
function stopDrag() {
  if (document.querySelector('body').classList.contains('drag')) {
    window.removeEventListener('mousemove', manualDrag);
    document.querySelector('body').classList.remove('drag');
  }
}

function manualDrag(e) {
  moveArrow(e);
  changeMainColor();
  changeExtraColors();
}

function moveArrow(e) {
  pointerX = e.clientX;
  if (pointerX < squareLeft) {
    pointerX = squareLeft;
  } else if (pointerX > squareLeft + squareWidth) {
    pointerX = squareLeft + squareWidth;
  }

  pointerY = e.clientY;
  if (pointerY < squareTop) {
    pointerY = squareTop;
  } else if (pointerY > squareTop + squareHight) {
    pointerY = squareTop + squareHight;
  }

  pointer.style.left = `${pointerX - pointerSize / 2}px`;
  pointer.style.top = `${pointerY - pointerSize / 2}px`;
}

function changeMainColor() {
  hue = ((pointerX - squareLeft) / squareWidth) * 360;
  saturation = ((pointerY - squareTop) / squareHight) * 50 + 50;
  // square.style.backgroundColor = `hsl(${hue},${saturation}%,${brightness}%)`;
  document.querySelector('.txt-color').textContent = `hsl(${Math.floor(hue)},${Math.floor(saturation)}%,50%)`;
  document.querySelector('.pointer').style.backgroundColor = `hsl(${hue},${saturation}%,${brightness}%)`;
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
const minusBtn = document.querySelector('.decreaseCount');
const plusBtn = document.querySelector('.increaseCount');

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
