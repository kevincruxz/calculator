const screenValue = document.querySelector('.screen');
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
        if (operation === "+" && number1 !== "" && number2 !== "") {
            add(parseInt(number1, 10), parseInt(number2, 10));
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
    let sum = digit1 + digit2;
    console.log(sum);
    return; 
}

function substract(digit1, digit2) {
    return digit1 - digit2;
}

function multiply(digit1, digit2) {
    return digit1 * digit2;
}

function divide(digit1, digit2) {
    return digit1 / digit2;
}