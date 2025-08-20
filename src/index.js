const display = document.getElementById("display");
const history = document.getElementById("history");
const themeBtn = document.getElementById("themeBtn");

let firstValue = null;
let operator = null;
let waitingSecond = false;

// ввод цифр
function inputDigit(digit) {
  if (waitingSecond) {
    display.textContent = digit;
    waitingSecond = false;
  } else {
    display.textContent =
      display.textContent === "0" ? digit : display.textContent + digit;
  }
}
// ввод точки
function inputDot() {
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}
// очистка
function clearAll() {
  display.textContent = "0";
  history.textContent = "";
  firstValue = null;
  operator = null;
  waitingSecond = false;
}
// смена знака
function changeSign() {
  display.textContent = (parseFloat(display.textContent) * -1).toString();
}
// подсчёт процентов
function percent() {
  display.textContent = (parseFloat(display.textContent) / 100).toString();
}
// выбор оператора
function chooseOperator(op) {
  if (firstValue === null) {
    firstValue = parseFloat(display.textContent);
  } else if (operator && !waitingSecond) {
    const result = calc(firstValue, parseFloat(display.textContent), operator);
    display.textContent = result.toString();
    firstValue = result;
  }
  operator = op;
  history.textContent = firstValue + " " + operator;
  waitingSecond = true;
}
// вычисления
function calc(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Ошибка" : a / b;
  return b;
}

//  = равно
function equals() {
  if (operator && !waitingSecond) {
    const second = parseFloat(display.textContent);
    const result = calc(firstValue, second, operator);
    history.textContent = firstValue + " " + operator + " " + second + " =";
    display.textContent = result.toString();
    firstValue = result;
    operator = null;
  }
}

// свич темы
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
// обработка кнопочек
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === "digit") inputDigit(value);
    if (action === "dot") inputDot();
    if (action === "clear") clearAll();
    if (action === "sign") changeSign();
    if (action === "percent") percent();
    if (action === "operator") chooseOperator(value);
    if (action === "equals") equals();
  });
});
