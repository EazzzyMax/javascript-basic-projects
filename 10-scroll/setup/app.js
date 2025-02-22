// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = linksHeight + 'px';
  } else {
    linksContainer.style.height = 0;
  }
});

// ********** fixed navbar ***********
const navbar = document.querySelector('#nav');
const topLink = document.querySelector('.top-link');
window.addEventListener('scroll', function () {
  if (window.pageYOffset > navbar.getBoundingClientRect().height) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }

  if (window.pageYOffset > window.innerHeight) {
    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});
// ********** smooth scroll ************

scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    //prevent default
    e.preventDefault();
    //elementYPosition
    const id = e.currentTarget.getAttribute('href');
    let elementYPosition = document.querySelector(`${id}`).offsetTop;
    //calculate
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed-nav'); 
    if (!fixedNav) {
      elementYPosition -= navHeight;
    }
    if (navHeight > 82) {
      elementYPosition += containerHeight;
    }

    console.log(elementYPosition);
    console.log(navHeight);
    console.log(containerHeight);
    console.log(fixedNav);

  
    window.scrollTo(0, elementYPosition-navHeight);
    linksContainer.style.height = 0;
  });
});
