const value = document.getElementById('value');
const btns = document.querySelectorAll('.btn');

let count = 0;
btns.forEach(function (btn) {
   btn.addEventListener('click', function (e) {
      const styles = e.currentTarget.classList;

      if (styles.contains('decrease')) {
         value.textContent = --count;
      }
      else if (styles.contains('reset')) {
         value.textContent = count = 0;
      }
      else {
         value.textContent = ++count;
      }

      if (count < 0) {
         value.style.color = 'red';
      }
      else if (count === 0) {
         value.style.color = '#222';
      }
      else {
         value.style.color = 'green';
      }
      console.log(count);
   });
});
