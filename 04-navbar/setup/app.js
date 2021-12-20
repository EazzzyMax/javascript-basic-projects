// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const links = document.querySelector('.links');
const burger = document.querySelector('.nav-toggle');

burger.addEventListener('click', function () {
   links.classList.toggle('show-links');
   console.log(links.classList.contains('show-links'));
});
