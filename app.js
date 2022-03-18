const screenValue = document.querySelector('.interactive-zone');
const resultValue = document.querySelector('.results')
init();

function init() {
    const button = document.querySelectorAll('.button');
    let value = "";

    button.forEach(div => {
        div.addEventListener('click', (e) => {
            e.target.classList.add('pressed');
            value = div.textContent;
            appBrain(value);
        });
    });

    document.addEventListener('keydown', function(e) {
        let key = e.key
        button.forEach((div) => {
            if (div.textContent === key || key === "*") {
                if (key === "*") {
                    value = "x";
                    let mult = document.querySelector('.mult');
                    mult.classList.add('pressed');
                } else {
                    value = key;
                    div.classList.add('pressed');
                }
                appBrain(value);
            } else if (key === "Enter") {
                let equal = document.querySelector('.equal');
                value = "=";
                equal.classList.add('pressed');
                appBrain(value);
            } else if (key === "Backspace" && resultOnScreen === true) {
                cleanScreen();
            } else if (key === "Backspace") {
                value = "ERASE";
                div.classList.add('pressed');
                appBrain(value);
                key = "";
            }
        }); 
    });

    document.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('pressed');
    });
}

let operation = "", number1 = "", number2 = "", resultOnScreen = false;

function appBrain(value) {
    if (value === "+" || value === "-" || value === "x" || value === "/") {

        if (operation !== "" && number2 === "") {
            return;
        } else if (operation !== "" && number2 !== ""){
            operatorChecker();
            screenValue.textContent = resultValue.textContent;
            number1 = resultValue.textContent;
            screenValue.textContent += ` ${value} `
            operation = value;
        } else if (resultOnScreen === true) {
            screenValue.textContent = resultValue.textContent;
            number1 = resultValue.textContent;
            screenValue.textContent += ` ${value} `
            operation = value;
            resultOnScreen = false;
        } else {
            screenValue.textContent += ` ${value} `
            operation = value;
        }

    } else if (value === "CLEAR") {
        cleanScreen();
    } else if (value === "ERASE") {
        if (resultOnScreen === true) return;
        else {
            if (operation === "") {
                eraseChar(1);
            } else {
                eraseChar(2);
            }
        }
    } else if (value === "=") {
        if (resultOnScreen === true) return;
        operatorChecker();
        resultOnScreen = true;
        operation = "";
    } else if (value === ".") {
        if (resultOnScreen === true) return;
        else {
            if (operation === "") {
                doubleDotBlocker(1);
            } else {
                doubleDotBlocker(2);
            }
        }
    } else {

        if (operation === "") {
            if (resultOnScreen === true) {
                screenValue.textContent = `${value}`
                number1 += value;
                resultOnScreen = false;
            }else if (screenValue.textContent !== "0") {
                screenValue.textContent += `${value}`;
                number1 += value;
            }else {
                screenValue.textContent = `${value}`;
                number1 += value;
            } 
        } else {
            screenValue.textContent += `${value}`
            number2 += value;
        }

    }
}

function operatorChecker() {
    let int1 = Number(number1);
    let int2 = Number(number2);
    if (operation === "+" && number1 !== "" && number2 !== "") {
        add(int1, int2);
    } else if (operation === "-" && number1 !== "" && number2 !== "") {
        substract(int1, int2);
    } else if (operation === "x" && number1 !== "" && number2 !== "") {
        multiply(int1, int2);
    } else {
        divide(int1, int2);
    }
}

function add(digit1, digit2) {
    let op = digit1 + digit2;
    resultValue.textContent = `${op}`;
    number1 = "";
    number2 = "";
    return; 
}

function substract(digit1, digit2) {
    let op = digit1 - digit2;
    resultValue.textContent = `${op}`;
    number1 = "";
    number2 = "";
    return; 
}

function multiply(digit1, digit2) {
    let op = digit1 * digit2;
    resultValue.textContent = `${op}`;
    number1 = "";
    number2 = "";
    return; 
}

function divide(digit1, digit2) {
    let op = digit1 / digit2;
    resultValue.textContent = `${op}`;
    number1 = "";
    number2 = "";
    return; 
}

function cleanScreen() {
    screenValue.textContent = "0";
    resultValue.textContent = "";
    operation = "";
    number1 = ""; 
    number2 = "";
}

function eraseChar(num) {
    const arr = Array.from(screenValue.textContent);
    let numArray = [];
    if (num === 1) {
        numArray = Array.from(number1);
    } else {
        numArray = Array.from(number2);
    }
    
    if (arr[arr.length - 1] === " ") { //Because of how i made the app, when a user inputs an operator it leaves 1 space before & after it so here i remove all of it
        arr.splice(arr.length - 3, 3);
        operation = "";
    } else {
        numArray.splice(numArray.length - 1, 1);
        arr.splice(arr.length - 1, 1);
    }

    screenValue.textContent = `${arr.join("")}`
    if (num === 1) {
        number1 = `${numArray.join("")}`;
    } else {
        number2 = `${numArray.join("")}`;
    }
}

function doubleDotBlocker(num) {
    let arr = [];
    if (num === 1) {
        arr = Array.from(number1);
    } else {
        arr = Array.from(number2);
    }
    let isPoint = arr.some(point => point === ".");
    if (!isPoint) {
        if (num === 1) {
            number1 += ".";
        } else {
            number2 += ".";
        }
        screenValue.textContent += "."
    }
}