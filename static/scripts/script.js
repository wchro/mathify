"use strict";

let numberScreen = document.querySelector(".screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const specials = document.querySelectorAll(".special");

let num = new Array(2);
let op;

const resetAll = () => {
  num = new Array(2);
  numberScreen.value = "";
  numberScreen.placeholder = "0";
  op = "";
};

const updateScreen = (n) => {
  numberScreen.value += n;
};

const setNumbers = (n) => {
  num[!num[0] ? 0 : 1] = Number(n);
};

const calc = (arr, op) => {
  let result;
  if (op == "/") result = arr[0] / arr[1];
  if (op == "X") result = arr[0] * arr[1];
  if (op == "-") result = arr[0] - arr[1];
  if (op == "+") result = arr[0] + arr[1];
  if (op == "%") result = arr[0] % arr[1];
  resetAll();
  numberScreen.placeholder = `= ${result}`;
};

const setOp = (n) => {
  if (!(n == "=")) {
    setNumbers(numberScreen.value);
    numberScreen.value = "";
    numberScreen.placeholder = n;
    op = n;
  }

  if (n == "=" && num[0]) {
    setNumbers(numberScreen.value);
    num[1] && calc(num, op);
  }
};

const handleSpecial = (b) => {
  b == "%" && setOp(b);
  b == "C" && resetAll();
  if (b == "+/-") numberScreen.value = numberScreen.value * -1;
  b == "H" && console.log("Historial todavia no implementado"); // TODO: Guardar resultados en local storage
};

numbers.forEach((number) =>
  number.addEventListener("click", () => {
    updateScreen(number.textContent);
  })
);

operators.forEach((operator) =>
  operator.addEventListener("click", () => setOp(operator.textContent))
);

specials.forEach((special) =>
  special.addEventListener("click", () => handleSpecial(special.textContent))
);
