const modalBtn = document.querySelector('.modal-btn');
const closeBtn = document.querySelector('.close-btn');
const modalOverlay = document.querySelector('.modal-overlay');

modalBtn.addEventListener('click', () => {
   modalOverlay.classList.toggle('open-modal')
})
closeBtn.addEventListener('click', () => {
   modalOverlay.classList.toggle('open-modal')
})

