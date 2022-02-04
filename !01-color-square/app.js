let hue;
let saturation;
//form
let hueDifference = 180;
let brightness = 100;
const stepForm = document.getElementById('step');
const brightnessForm = document.getElementById('brightness');
const sectorForm = document.getElementById('colorSector');
const brightnessControl = document.querySelector('.brightness-control')

stepForm.addEventListener('input', changeStep);
sectorForm.addEventListener('input', changeColorWheelSector);
brightnessForm.addEventListener('input', changeBrightness);

const btnsChangeValue = document.querySelectorAll('.form__btn');
btnsChangeValue.forEach(function (item) {
  item.addEventListener('click', changeValueOnClick);
});

function changeValueOnClick(e) {
  e.preventDefault();

  input = e.currentTarget.parentElement.parentElement.children[0];

  const increaseIfTrue = e.currentTarget.classList.contains('increase');
  let newValue = input.value;
  if (increaseIfTrue) {
    newValue = parseInt(newValue) + parseInt(input.step);
  } else {
    newValue = parseInt(newValue) - parseInt(input.step);
  }
  input.value = newValue;

  if (input.id == 'step') {
    changeStep();
  } else if (input.id == 'colorSector') {
    changeColorWheelSector();
  } else if (input.id == 'brightness') {
    changeBrightness();
  }
}

//change step / brightness
function changeStep() {
  if (stepForm.value > 360 / counter) {
    hueDifference = 360 / counter;
    stepForm.value = hueDifference;
  }
  hueDifference = stepForm.value;
  sectorForm.value = counter * hueDifference;
  changeExtraColors();
}

function changeColorWheelSector() {
  hueDifference = sectorForm.value / counter;
  stepForm.value = hueDifference;
  changeExtraColors();
}

function changeBrightness() {
  brightness = brightnessForm.value;
  changeMainColor();
  changeExtraColors();
  brightnessControl.style.opacity = (100-brightness) / 100;
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

//events. start stop dragging!!!!!!!!!!!!!!!!!!!!!!!!!!
square.addEventListener('mousedown', function (e) {
  draging(e);
  startDrag();
});
window.addEventListener('mouseup', function () {
  stopDrag();
});

//functions. start stop dragging
function startDrag() {
  window.addEventListener('mousemove', draging);
  document.querySelector('body').classList.add('drag');
}
function stopDrag() {
  if (document.querySelector('body').classList.contains('drag')) {
    window.removeEventListener('mousemove', draging);
    document.querySelector('body').classList.remove('drag');
  }
}

//drag
function draging(e) {
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

let hueRange = 180;
function changeRangeSize() {
  hueRange = 360 / counter;
  square.style['background-size'] = `${counter * 100}% 100%`;
}

function changeMainColor() {
  hue = ((pointerX - squareLeft) / squareWidth) * hueRange;
  saturation = ((pointerY - squareTop) / squareHight) * 50 + 50;

  let rgb = RGBfromHSV(hue, saturation, brightness);
  document.querySelector('.txt-color').textContent = `hsb(${Math.floor(hue)},${Math.floor(saturation)}%,${Math.floor(
    brightness
  )}%)`;
  document.querySelector('.pointer').style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  // document.querySelector('.pointer').style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  // document.querySelector('.pointer').style.backgroundColor = `hsl(${hue},${saturation}%,${brightness}%`;
}

function changeExtraColors() {
  const allItems = document.querySelectorAll('.items');
  allItems.forEach(function (items) {
    if (!items.classList.contains('hide')) {
      let itemList = items.querySelectorAll('.item');
      let extraMiddleHue = (items.id - 1) * hueDifference + hue;
      let extraHue = extraMiddleHue -  10 * (itemList.length - 1);
      
      itemList.forEach(function (item) {
        let rgb = RGBfromHSV(extraHue, saturation, brightness);
        item.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]}`;
        extraHue += 20;
      })
      // child.style.backgroundColor = `hsl(${extraHue},${saturation}%,${brightness}%`;
    }
  });
}

//counf of itemS
const minusBtn = document.querySelector('.decreaseCount');
const plusBtn = document.querySelector('.increaseCount');

minusBtn.addEventListener('click', decreaceCountOfItems);
plusBtn.addEventListener('click', increaseCountOfItems);

function decreaceCountOfItems() {
  if (counter > 1) {
    deleteItem();
    counter--;
  }
  changeExtraColors();
  changeColorWheelSector();
  changeRangeSize();
}

function increaseCountOfItems() {
  if (counter < 6) {
    createItem();
    counter++;
  }
  changeExtraColors();
  changeColorWheelSector();
  changeRangeSize();
}

// container and items
const mainContainer = document.querySelector('.rec-container');

function deleteItem() {
  item = document.getElementById(`${counter + 1}`);
  mainContainer.removeChild(item);
  document.getElementById(counter).classList.add('hide');
}

function createItem() {
  const item = document.createElement('div');
  item.classList.add('items');
  item.classList.add('hide');
  item.id = counter + 2;
  item.innerHTML = `
          <div class="item"></div>
  `;
  mainContainer.appendChild(item);

  document.getElementById(counter + 1).classList.remove('hide');
}

//работа с HSV(HSB) более понятен человеческому глазу
function RGBfromHSV(Hin, S, V) {
  let H = Hin % 360;
  const Hi = parseInt(H / 60);
  const Vmin = ((100 - S) * V) / 100;
  const a = (V - Vmin) * ((H % 60) / 60);

  const Vinc = Vmin + a;
  const Vdec = V - a;

  let r;
  let g;
  let b;

  switch (Hi) {
    case 0:
      r = V;
      g = Vinc;
      b = Vmin;
      break;
    case 1:
      r = Vdec;
      g = V;
      b = Vmin;
      break;
    case 2:
      r = Vmin;
      g = V;
      b = Vinc;
      break;
    case 3:
      r = Vmin;
      g = Vdec;
      b = V;
      break;
    case 4:
      r = Vinc;
      g = Vmin;
      b = V;
      break;
    case 5:
      r = V;
      g = Vmin;
      b = Vdec;
    default:
      break;
  }

  r = Math.round((r * 255) / 100);
  g = Math.round((g * 255) / 100);
  b = Math.round((b * 255) / 100);

  return [r, g, b];
}
