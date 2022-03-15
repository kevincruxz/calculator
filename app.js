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

        if (operation !== "" && number2 === "") {
            return;
        } else if (operation !== "" && number2 !== ""){
            operatorChecker();
            screenValue.textContent = resultValue.textContent;
            number1 = resultValue.textContent;
            screenValue.textContent += ` ${value} `
            operation = value;
        } else {
            screenValue.textContent += ` ${value} `
            operation = value;
        }

    } else if (value === "AC") {
        cleanScreen();
    } else if (value === "Erase") {
        eraseChar();
    } else if (value === "=") {
        operatorChecker();
        screenValue.textContent = "0";
        operation = "";
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

function operatorChecker() {
    let int1 = parseInt(number1, 10);
    let int2 = parseInt(number2, 10);
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

function eraseChar() {
    const arr = Array.from(screenValue.textContent);
    
    if (arr[arr.length - 1] === " ") { //Because of how i made the app, when a user inputs an operator it leaves 1 space before & after it so here i remove all of it
        arr.splice(arr.length - 3, 3);
        operation = "";
    } else {
        arr.splice(arr.length - 1, 1);
    }

    screenValue.textContent = `${arr.join("")}`
}