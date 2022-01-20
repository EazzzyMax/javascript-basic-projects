// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.querySelector('#grocery');

const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

const liveItems = list.children;

// edit option
let editElement;
let editFlag = false;
let editID = '';
// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem);
//clear items
clearBtn.addEventListener('click', clearItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement('article');
    element.classList.add('grocery-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
              <button class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
    //append child
    list.appendChild(element);
    console.log(liveItems);
    //aletr
    displayAlert('item added to the list', 'success');
    //show container
    container.classList.add('show-container');
    //addToLocalStorage
    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    console.log('edit');
  } else {
    displayAlert('please enter value', 'danger');
  }
  const deleteBtn = document.querySelector('.delete-btn');
}

//edit item
function editItem() {
  console.log('edit');
}
//delete item
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  list.removeChild(element);
  displayAlert('Item deleted', 'danger');
  console.log(list.length);
  if (liveItems.length === 0) {
    container.classList.remove('show-container');
  }
  setBackToDefault();
  // removeFromLocalStorage(id);
}

//alert
var alertTimeout;
function displayAlert(text, action) {
  //default
  alert.classList.remove(`alert-danger`);
  alert.classList.remove(`alert-success`);
  clearTimeout(alertTimeout);

  //alert
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  //default
  alertTimeout = setTimeout(function () {
    alert.classList.remove(`alert-danger`);
    alert.classList.remove(`alert-success`);
  }, 1500);
}

//default
function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}

//clear all
function clearItems() {
  const items = document.querySelectorAll('.grocery-item');
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert('clear items', 'danger');
  setBackToDefault();
  // localStorage.revoveItem('list')
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {}
// ****** SETUP ITEMS **********
