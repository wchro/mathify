"use strict";

(() =>
  !localStorage.getItem("history") &&
  localStorage.setItem("history", JSON.stringify({ items: [] })))();

const numberScreen = document.querySelector(".screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const specials = document.querySelectorAll(".special");

const modal = document.querySelector(".history");
const historyItems = document.querySelector(".history-list");
const closeModalBtn = document.querySelector(".close-modal");

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

const calc = (arr, op, finish = true) => {
  let result;
  if (op == "/") result = arr[0] / arr[1];
  if (op == "X") result = arr[0] * arr[1];
  if (op == "-") result = arr[0] - arr[1];
  if (op == "+") result = arr[0] + arr[1];
  if (op == "%") result = arr[0] % arr[1];

  if (finish) {
    resetAll();
    numberScreen.placeholder = `= ${result}`;
    const history = JSON.parse(localStorage.getItem("history"));
    history.items.push(result);
    localStorage.setItem("history", JSON.stringify(history));
  }
  return result;
};

const setOp = (n) => {
  if (!(n == "=")) {
    setNumbers(numberScreen.value);
    numberScreen.value = "";
    numberScreen.placeholder = n;
    if (num[0] && num[1]) num = [calc(num, op, false), undefined];
    op = n;
  }

  if (n == "=" && num[0]) {
    setNumbers(numberScreen.value);
    num[1] && calc(num, op);
  }
};

const showModal = () => {
  const history = JSON.parse(localStorage.getItem("history"));
  if (history.items) {
    historyItems.innerHTML = history.items
      .reverse()
      .map((item) => `<li>${item}</li>`)
      .join("");
  } else {
    historyItems.innerHTML = "<p>Empty ☹️</p>";
  }
  modal.style.display = "grid";
};

const closeModal = () => {
  modal.style.display = "none";
};

const handleSpecial = (b) => {
  b == "%" && setOp(b);
  b == "C" && resetAll();
  if (b == "+/-") numberScreen.value = numberScreen.value * -1;
  b == "H" && showModal();
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

closeModalBtn.addEventListener("click", closeModal);
