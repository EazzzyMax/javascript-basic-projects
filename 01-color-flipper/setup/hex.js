const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
   let randomColor = '#';
   for (let i = 0; i < 6; i++) {
      randomColor += hex[getRandomNumber(16)]
   }
   console.log(randomColor);

   color.textContent = randomColor;
   document.body.style.backgroundColor = randomColor;
})

function getRandomNumber(n) {
   return Math.floor(Math.random()*n);
}