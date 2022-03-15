const screenValue = document.querySelector('.interactive-zone');
const resultValue = document.querySelector('.results')
init();

function init() {
    const button = document.querySelectorAll('.button');
    let value = "";

    button.forEach(div => {
        div.addEventListener('click', (e) => {
            value = div.textContent;
            appBrain(value);
        });
    });
}

let operation = "", number1 = "", number2 = "";

function appBrain(value) {
    if (value === "+" || value === "-" || value === "x" || value === "/") {

        if (operation !== "") return;
        screenValue.textContent += ` ${value} `
        operation = value;

    } else if (value === "AC") {
        cleanScreen();
    } else if (value === "Erase") {
        updateDisplay();
    } else if (value === "=") {

        parseInt(number1, 10);
        parseInt(number2, 10);
        if (operation === "+" && number1 !== "" && number2 !== "") {
            add(number1, number2);
        } else if (operation === "-" && number1 !== "" && number2 !== "") {
            substract(number1, number2);
        } else if (operation === "x" && number1 !== "" && number2 !== "") {
            multiply(number1, number2);
        } else {
            divide(number1, number2);
        }

    } else {

        if (operation === "") {
            if (screenValue.textContent !== "0") {
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

function add(digit1, digit2) {
    let op = digit1 + digit2;
    resultValue.textContent = `${op}`;
    return; 
}

function substract(digit1, digit2) {
    let op = digit1 - digit2;
    resultValue.textContent = `${op}`;
    return; 
}

function multiply(digit1, digit2) {
    let op = digit1 * digit2;
    resultValue.textContent = `${op}`;
    return; 
}

function divide(digit1, digit2) {
    let op = digit1 / digit2;
    resultValue.textContent = `${op}`;
    return; 
}

function cleanScreen() {
    screenValue.textContent = "0";
    resultValue.textContent = "";
    operation = "";
    number1 = ""; 
    number2 = "";
}