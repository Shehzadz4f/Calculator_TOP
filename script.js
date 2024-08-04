let num1 = '';
let num2 = '';
let operatorSelected = '';
let previousButton;
let plusMinus = false;
let operatorButtonEngaged = false;
let previousElement;

function operate(n1, n2, op) {
  switch(op) {
    case '+':
      return Number(n1) + Number(n2);

    case '-':
      return Number(n1) - Number(n2);

    case '*':
      return Number(n1) * Number(n2);

    case '/':
      if (n2 === 0) {
        return 'Error'
      } else
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
const plusMinusButton = document.querySelector('.js-plus-minus-button');
const percentageButton = document.querySelector('.js-percentage-button');


numberButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (operatorButtonEngaged) {
    operatorButtonEngaged = false;
    previousElement.classList.remove('operator-button-engaged');
    }
    getDisplayNumber(event);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (!operatorButtonEngaged) {
      operatorButtonEngaged = true;
      button.classList.add('operator-button-engaged');
    } else if (isNaN(Number(previousButton))) {
      console.log('else if triggered');
      previousElement.classList.remove('operator-button-engaged');
      button.classList.add('operator-button-engaged');
    }

    if (display.textContent == 0 && button.textContent === '-') {
      plusMinus = true;
    } else if (num1 === '') {
      num1 = Number(display.textContent);
      console.log('num1', num1);

    } else if(num1 !== '') {
      num2 = Number(display.textContent);
      console.log('num2', num2);
    }

    if (num2 !== '') {
      if (Number(previousButton)) {
        num1 = operate(num1, num2, operatorSelected);
        display.textContent = num1;
        console.log('new num1', num1);
      }
      
    }
    operatorSelected = button.textContent;
    if (operatorSelected === '%') {
      num1 = operate(num1, num2, operatorSelected);
      display.textContent = num1;
    }
    console.log('operatorSelected',operatorSelected);
    previousButton = button.textContent;    
    console.log (previousButton);
    previousElement = event.target;
    });
  });

plusMinusButton.addEventListener('click', () => {
  if (plusMinus === false) {
    display.textContent = '-' + display.textContent;
    plusMinus = true;
  } 
  else if (plusMinus === true) {
    display.textContent = display.textContent
      .split('')
      .toSpliced(0,1)
      .join('');
    console.log (display.textContent)
    plusMinus = false; 
  }
});

resetButton.addEventListener('click', () => {
  if (operatorButtonEngaged) {
    operatorButtonEngaged = false;
    previousElement.classList.remove('operator-button-engaged');
  }
  display.textContent = 0;
  previousButton = undefined;
  num1 = '';
  num2 = '';
  operatorSelected = '';
});

percentageButton.addEventListener('click', () => {
  console.log('event triggered');
  num1 = Number(display.textContent);
  operatorSelected = percentageButton.textContent;
  num1 = operate(num1, num2, operatorSelected);
  display.textContent = num1;
});

equalsToButton.addEventListener('click', () => {
  num2 = Number(display.textContent); 
  console.log('num1',num1);
  console.log('num2',num2);
  console.log('operatorSelected',operatorSelected);
  display.textContent = operate(num1, num2, operatorSelected);
});