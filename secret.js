const keySequence = [
  'j',
  'e',
  's',
  'u',
  's'
];


//check arrays are equal
function equalsCheck(a, b) {
  // check the length
  if (a.length != b.length) {
      return false;
  } else {
      let result = false;
      // comparing each element of array 
      for (let i = 0; i < a.length; i++) {

          if (a[i] !== b[i]) {
              return false;
          } else {
              result = true;
          }
      }
      return result;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let buffer = [];
  let lastKeyTime = Date.now();

  document.addEventListener('keydown', event => {
      const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const key = event.key.toLowerCase();

      // we are only interested in alphanumeric keys
      if (charList.indexOf(key) === -1) return;

      const currentTime = Date.now();

      if (currentTime - lastKeyTime > 1000) {
          buffer = [];
      }

      



      buffer.push(key);
      lastKeyTime = currentTime;

      const result = equalsCheck(buffer, keySequence);
      if (result){
        window.location.href = "http://p3nguinmeme.org.uk/secret.html";
      }
      
      
      
  });
});