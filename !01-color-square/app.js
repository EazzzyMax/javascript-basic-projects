const square = document.querySelector('.color-square');
const dx = square.offsetLeft;
const dy = square.offsetTop;
const arrow = document.querySelector('.arrow')
// square.addEventListener('mousemove', changeColor);

let timeout;

square.addEventListener('mousedown', function (e) {
  changeMainColor(e);
  startDrag();
});
square.addEventListener('mouseup', function () {
  stopDrag();
});
arrow.addEventListener('mouseup', function () {
  stopDrag();
});
square.addEventListener('mouseout', function () {
  timeout = setTimeout(stopDrag, 500)
});
square.addEventListener('mousemove', function () {
  clearTimeout(timeout);
})

function startDrag() {
  square.addEventListener('mousemove', changeMainColor);
  square.classList.add('drag')
}
function stopDrag() {
  square.removeEventListener('mousemove', changeMainColor);
  square.classList.remove('drag')
}

function changeMainColor(e) {
  let x = e.clientX - dx;
  let y = e.clientY - dy;
  const maxX = square.offsetWidth - 1;
  const maxY = square.offsetHeight - 1;
  let x1 = (x / maxX) * 360;
  let y1 = (y / maxY) * 40 + 30;
  
  const arrowSize = arrow.offsetHeight;
  arrow.style.left = `${e.clientX - arrowSize / 2}px`;
  arrow.style.top = `${e.clientY - arrowSize / 2}px`;
  document.querySelector('.txt-color').textContent = `${Math.floor(x1)}° ${Math.floor(y1)}%`;
  square.style.backgroundColor = `hsl(${x1},${y1}%,50%)`;
}

//счетчик
const minusBtn = document.querySelector('.decrease');
const plusBtn = document.querySelector('.increase');
let counter = 1;

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
  createItem();
  counter++;
  console.log(counter);
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
