let num1 = '';
let num2 = '';
let operatorSelected = '';
let previousButton;
let plusMinus = false;
let operatorButtonEngaged = false;
let previousElement;

const display = document.querySelector('.js-display');
display.textContent = '0';
const numberButtons = document.querySelectorAll('.js-number-buttons');
const operatorButtons = document.querySelectorAll('.js-operator-buttons');
const resetButton = document.querySelector('.js-reset-button');
const equalsToButton = document.querySelector('.js-equals-to-button');
const plusMinusButton = document.querySelector('.js-plus-minus-button');
const percentageButton = document.querySelector('.js-percentage-button');

function operate(n1, n2, op) {
  switch(op) {
    case '+':
      let resultAdd = Math.round((Number(n1) + Number(n2)) * 100000000) / 100000000;
      if (resultAdd.toString().length > 9) {
        return resultAdd.toExponential(5);
      } else {
        return resultAdd;
      }

    case '-':
      return Math.round((Number(n1) - Number(n2)) * 100000000) / 100000000;

    case '×':
      let resultMul = Math.round((Number(n1) * Number(n2)) * 100000000) / 100000000;
      if (resultMul.toString().length > 9) {
        return resultMul.toExponential(5);
      } else {
        return resultMul;
      }
    
    case '*':
    let resultMulKey = Math.round((Number(n1) * Number(n2)) * 100000000) / 100000000;
    if (resultMulKey.toString().length > 9) {
      return resultMulKey.toExponential(5);
    } else {
      return resultMulKey;
    }

    case '÷':
      if (n2 === 0) {
        return 'Error';
      } else {
      return Math.round((Number(n1) / Number(n2)) * 100000000) / 100000000;
      }

    case '/':
      if (n2 === 0) {
        return 'Error';
      } else {
      return Math.round((Number(n1) / Number(n2)) * 100000000) / 100000000;
      }

    case '%':
      return Math.round((Number(n1) / 100) * 100000000) / 100000000;
  }
}

function getDisplayNumber(event) {
  if(display.textContent == 0) {
    if (event.target.textContent !== '.') {
      display.textContent = event.target.textContent;
    } else {
      display.textContent = '0';
      display.textContent += event.target.textContent;
    }
    previousButton = Number(event.target.textContent);
  } else if(display.textContent != 0 && typeof previousButton === 'number' && display.textContent.length < 9) {
    display.textContent += event.target.textContent;
    previousButton = Number(event.target.textContent);
  } else if(display.textContent != 0 && typeof previousButton === 'string') {
    if (event.target.textContent !== '.') {
      display.textContent = '';
      display.textContent += event.target.textContent;
    } else {
      display.textContent = '0';
      display.textContent += event.target.textContent;
    }
    previousButton = Number(event.target.textContent);
  }
}

function getDisplayNumberStrict (event) {
  if(typeof previousButton === 'number' 
    && event.target.textContent !== '.' 
    && display.textContent.length < 10) {
      display.textContent += event.target.textContent;
      previousButton = Number(event.target.textContent);
  } else if(typeof previousButton === 'string') {
    if (event.target.textContent !== '.') {
      display.textContent = '';
      display.textContent += event.target.textContent;
    } else {
      display.textContent = '0';
      display.textContent += event.target.textContent;
    }
    previousButton = Number(event.target.textContent);
  }
}

numberButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (operatorButtonEngaged) {
    operatorButtonEngaged = false;
    previousElement.classList.remove('operator-button-engaged');
    }
    resetButton.textContent = 'C';
    if(!display.textContent.includes('.')) {
      getDisplayNumber(event);
    } else {
      getDisplayNumberStrict(event);
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    //For css
    if (!operatorButtonEngaged) {
      operatorButtonEngaged = true;
      button.classList.add('operator-button-engaged');
    } else if (isNaN(Number(previousButton))) {
      previousElement.classList.remove('operator-button-engaged');
      button.classList.add('operator-button-engaged');
    }
    //Assign num1 and/or num2 values
    if (display.textContent == 0 && button.textContent === '-') {
      plusMinus = true;
      num1 = 0;
    } else if (num1 === '') {
      num1 = Number(display.textContent);
    } else if(num1 !== '') {
      num2 = Number(display.textContent);
    }
    
    if (num2 !== '') {
      if (!isNaN(Number(previousButton))) {
        num1 = operate(num1, num2, operatorSelected);
        display.textContent = num1;
      }
    }
    operatorSelected = button.textContent;
    previousButton = button.textContent;    
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
    plusMinus = false; 
  }
});

resetButton.addEventListener('click', () => {
  if (operatorButtonEngaged) {
    operatorButtonEngaged = false;
    previousElement.classList.remove('operator-button-engaged');
  }
  if (resetButton.textContent === 'C' && display.textContent != 0) {
    if (display.textContent.length === 1) {
      display.textContent = 0;
      return;
    }
    let modifyDisplay = display.textContent;
    let modifiedDisplayArr = modifyDisplay.split('');
    modifiedDisplayArr.pop();
    display.textContent = modifiedDisplayArr.join('');
  } else if (resetButton.textContent === 'C' && display.textContent == 0) {
    resetButton.textContent = 'AC';
    display.textContent = 0;
    previousButton = '';
    num1 = '';
    num2 = '';
    operatorSelected = '';
  }
});

percentageButton.addEventListener('click', () => {
  num1 = Number(display.textContent);
  operatorSelected = percentageButton.textContent;
  num1 = operate(num1, num2, operatorSelected);
  display.textContent = num1;
});

equalsToButton.addEventListener('click', () => {
  num2 = Number(display.textContent); 
  if (num1 === '' && num2 === 0) {
    display.textContent = 0;
  } else if (num1 === '' && num2 !== 0) {
    display.textContent = num2;
  } else {
    num1 = operate(num1, num2, operatorSelected);
    display.textContent = num1;
    num2 = '';
  }
  previousButton = equalsToButton.textContent;
});

//Adding keyboard support
//Number keys action
document.addEventListener('keydown', (event) => {
  if (operatorButtonEngaged) {
    operatorButtonEngaged = false;
    previousElement.classList.remove('operator-button-engaged');
    }
    resetButton.textContent = 'C';
    if(!display.textContent.includes('.')) {
      getDisplayNumberKeyboard(event);
    } else {
      getDisplayNumberKeyboardStrict(event);
    }
  });

const numericElements = '1234567890.';

function getDisplayNumberKeyboard(event) {
  if(display.textContent == 0 
    && numericElements.includes(event.key)) {
    if (event.key !== '.') {
      display.textContent = event.key;
    } else {
      display.textContent = '0';
      display.textContent += event.key;
    }
    previousButton = Number(event.key);
  } else if(display.textContent != 0 
    && typeof previousButton === 'number' 
    && display.textContent.length < 9 
    && numericElements.includes(event.key)) {
      display.textContent += event.key;
      previousButton = Number(event.key);
  } else if(display.textContent != 0 
    && typeof previousButton === 'string' 
    && numericElements.includes(event.key)) {
    if (event.key !== '.') {
      display.textContent = '';
      display.textContent += event.key;
    } else {
      display.textContent = '0';
      display.textContent += event.key;
    }
    previousButton = Number(event.key);
  }
}

function getDisplayNumberKeyboardStrict (event) {
  if(typeof previousButton === 'number' 
    && event.key !== '.' 
    && display.textContent.length < 10
    && numericElements.includes(event.key)) {
      display.textContent += event.key;
      previousButton = Number(event.key);
  } else if(typeof previousButton === 'string'
    && numericElements.includes(event.key)
  ) {
    if (event.key !== '.') {
      display.textContent = '';
      display.textContent += event.key;
    } else {
      display.textContent = '0';
      display.textContent += event.key;
    }
    previousButton = Number(event.key);
  }
}

const addKey = document.querySelector('#NumpadAdd');
const subtractKey = document.querySelector('#NumpadSubtract');
const multiplyKey = document.querySelector('#NumpadMultiply');
const divideKey = document.querySelector('#NumpadDivide');
const equalKey = document.querySelector('#NumpadEnter');

function modifyOperatorProperty (element) {
  if (!operatorButtonEngaged) {
    operatorButtonEngaged = true;
    element.classList.add('operator-button-engaged');
  } 
  else if (isNaN(Number(previousButton))) {
    console.log('prev elem:',previousElement)
    previousElement.classList.remove('operator-button-engaged');
    console.log('curr elem:', element);
    element.classList.add('operator-button-engaged');
  }
}

function assignAndOperate (event, element) {
  if (display.textContent == 0 && event.key === '-') {
    plusMinus = true;
    num1 = 0;
  } else if (num1 === '') {
    num1 = Number(display.textContent);
  } else if(num1 !== '') {
    num2 = Number(display.textContent);
  }
  if (num2 !== '') {
    if (!isNaN(Number(previousButton))) {
      num1 = operate(num1, num2, operatorSelected);
      display.textContent = num1;
    }
  }
  operatorSelected = event.key;
  previousButton = event.key;    
  previousElement = element;
}
//Operator keys action
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '+':
      modifyOperatorProperty(addKey);
      assignAndOperate(event, addKey);
      break;
    
    case '-':
      modifyOperatorProperty(subtractKey);
      assignAndOperate(event, subtractKey);
      break;

    case '*':
      modifyOperatorProperty(multiplyKey);
      assignAndOperate(event, multiplyKey);
      break;  
    
    case '/':
      modifyOperatorProperty(divideKey);
      assignAndOperate(event, divideKey);
      break; 
  }
});

//Reset key action
document.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    if (operatorButtonEngaged) {
      operatorButtonEngaged = false;
      previousElement.classList.remove('operator-button-engaged');
    }
    if (resetButton.textContent === 'C' && display.textContent != 0) {
      if (display.textContent.length === 1) {
        display.textContent = 0;
        return;
      }
      let modifyDisplay = display.textContent;
      let modifiedDisplayArr = modifyDisplay.split('');
      modifiedDisplayArr.pop();
      display.textContent = modifiedDisplayArr.join('');
    } else if (resetButton.textContent === 'C' && display.textContent == 0) {
      resetButton.textContent = 'AC';
      display.textContent = 0;
      previousButton = '';
      num1 = '';
      num2 = '';
      operatorSelected = '';
    }
  }
});

//Equal to key action
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === '=') {
    num2 = Number(display.textContent); 
    if (num1 === '' && num2 === 0) {
      display.textContent = 0;
    } else if (num1 === '' && num2 !== 0) {
      display.textContent = num2;
    } else {
      num1 = operate(num1, num2, operatorSelected);
      display.textContent = num1;
      num2 = '';
    }
  previousButton = equalsToButton.textContent;
  }
});

//Plus/minus key action 
document.addEventListener('keydown', (event) => {
  if (event.key === 'm' || event.key === 'M') {
    if (plusMinus === false) {
      display.textContent = '-' + display.textContent;
      plusMinus = true;
    } 
    else if (plusMinus === true) {
      display.textContent = display.textContent
        .split('')
        .toSpliced(0,1)
        .join('');
      plusMinus = false; 
    }
  }  
});
//Percentage key action
document.addEventListener('keydown', (event) => {
  if (event.key === '%') {
    num1 = Number(display.textContent);
    operatorSelected = percentageButton.textContent;
    num1 = operate(num1, num2, operatorSelected);
    display.textContent = num1;
  }
});
