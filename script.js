let num1 = '';
let num2 = '';
let operatorSelected = '';
let previousButton;

function operate(n1, n2, op) {
  switch(op) {
    case '+':
      return Number(n1) + Number(n2);

    case '-':
      return Number(n1) - Number(n2);

    case '*':
      return Number(n1) * Number(n2);

    case '/':
      return Number(n1) / Number(n2);

    case '%':
      return Number(n1) / 100;
  }
}

function getDisplayNumber(event) {
  if(display.textContent == 0) {
    display.textContent = event.target.textContent;
    previousButton = Number(event.target.textContent);

  } else if((display.textContent != 0 && typeof previousButton === 'number') || display.textContent === '-') {
    display.textContent += event.target.textContent;
    previousButton = Number(event.target.textContent);

  } else if(display.textContent != 0 && typeof previousButton === 'string') {
    display.textContent = '';
    display.textContent += event.target.textContent;
    previousButton = Number(event.target.textContent);
  }
}

const display = document.querySelector('.js-display');
display.textContent = '0';
const numberButtons = document.querySelectorAll('.js-number-buttons');
const operatorButtons = document.querySelectorAll('.js-operator-buttons');
const resetButton = document.querySelector('.js-reset-button');
const equalsToButton = document.querySelector('.js-equals-to-button');

numberButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
   getDisplayNumber(event);
  });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (display.textContent == 0 && button.textContent === '-') {
        display.textContent = '-';
      }
      if (typeof Number(num1) !== 'number') {
        num1 = Number(display.textContent);
        console.log('Typeof num1', typeof num1);
        console.log('num1', num1);
  
      } else if(typeof Number(num1) === 'number') {
        num2 = Number(display.textContent);
        console.log('Typeof num2',typeof num2);
        console.log('num2', num2);
      }
      operatorSelected = button.textContent;
      console.log('operatorSelected',operatorSelected);
      if (typeof Number(num2) === 'number') {
        num1 = operate(num1, num2, operatorSelected);
        display.textContent = num1;
        console.log('new num1', num1);
      }
      previousButton = button.textContent;    
    });
  });

resetButton.addEventListener('click', () => {
  display.textContent = 0;
  previousButton = undefined;
  num1 = '';
  num2 = '';
  operatorSelected = '';
});

equalsToButton.addEventListener('click', () => {
  num2 = Number(display.textContent); 
  console.log('num1',num1);
  console.log('num2',num2);
  console.log('operatorSelected',operatorSelected);
  display.textContent = operate(num1, num2, operatorSelected);
});