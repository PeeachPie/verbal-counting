"use strict";

import { Task } from './modules/Tasks.js';
import { OperatorButton, NumberButton, ActionButton } from './modules/Buttons.js';
import { Questions, Max } from './modules/Slider.js';

const $info =  document.querySelector(".info");

const $questionsSettings = document.querySelector(".questions-settings");
const $operatorsSettings = document.querySelector(".operators-settings");

const $numbersBlock = document.querySelector(".numbers");
const $maxBlock = document.querySelector(".max");

const Tasks = new Task()

// меняет страницу настроек
function changeSettingsPage(previousPage, nextPage) {
  hideElement(previousPage);
  showElement(nextPage);
}

// сбрасывает настройки
function resetSettings() {
  numbers.forEach(num => num.unselect());
  operators.forEach(operator => operator.unselect());

  Tasks.reset();
  questions.reset();
  max.reset();

  next.unable('text')
  reset.unable('svg')

  showElement($info)
}

new ActionButton(document.querySelector("#start"), 
  function () {
  localStorage.setItem("problems", JSON.stringify(Tasks.createProblems()));
  localStorage.setItem("questions", JSON.stringify(Tasks.questions));
})

new ActionButton(
  document.querySelector("#return"), 
  changeSettingsPage.bind(this, $questionsSettings, $operatorsSettings)
);

const reset = new ActionButton(
  document.querySelector("#reset"),
  resetSettings
)

const next = new ActionButton(
  document.querySelector("#next"), 
  changeSettingsPage.bind(this, $operatorsSettings, $questionsSettings)
);

const questions = new Questions (
  Tasks,
  document.querySelector(".questions"),
  // document.querySelector("#questions-range")
  )

const max = new Max(
  Tasks,
  document.querySelector(".max"),
  // document.querySelector("#max-range")
);

const operators = Array.from(document.querySelectorAll(".operators .choose > *"))
  .map((operator, i) => (new OperatorButton(Tasks, operator, ['+', '-', '*', '/'][i])))

const numbers = Array.from(document.querySelectorAll(".numbers .choose > *"))
  .map((number, i) => (new NumberButton(Tasks, number, i + 1)))

// выбирает делители/множители до нажатой кнопки включая ее
function selectNumbersBefore(button) {
  const num = button.number - 1;
  for (let j = num; j >= 0; j--) {
    if (!numbers[j].active) {
      numbers[j].setNumber();
    }
  }
}

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "flex";
}

// for (let i = 0; i < operators.length; i++) {
//   operators[i].element.addEventListener("click", operators[i].setOperator.bind(operators[i]));
// }

for (let i = 0; i < numbers.length; i++) {
  // numbers[i].element.addEventListener("click", numbers[i].setNumber.bind(numbers[i]));
  numbers[i].element.addEventListener("click", numbers[i].doubleClick.bind(numbers[i], selectNumbersBefore));
}

// max.numberInput.addEventListener("change", () => {
//   max.setInputValue('number')
//   max.setMaxValue(Tasks)
// })

// max.rangeInput.addEventListener("input", () => {
//   max.setInputValue('range')
//   max.setMaxValue(Tasks)
// })

// questions.numberInput.addEventListener("change", () => {
//   questions.setInputValue('number')
//   questions.setQuestionsValue(Tasks)
// })

// questions.rangeInput.addEventListener("input", () => {
//   questions.setInputValue('range')
//   questions.setQuestionsValue(Tasks)
// })

// start.element.addEventListener("click", start.callAction);

// reset.element.addEventListener("click", reset.callAction);

// next.element.addEventListener("click", next.callAction);

// back.element.addEventListener("click", back.callAction);

// window.addEventListener("load", resetSettings);
window.addEventListener("unload", resetSettings);

window.addEventListener("click", () => {
  Tasks.operators.includes("+") || Tasks.operators.includes("-")
    ? showElement($maxBlock)
    : hideElement($maxBlock);
  Tasks.operators.includes("*") || Tasks.operators.includes("/")
    ? showElement($numbersBlock)
    : hideElement($numbersBlock);

  if (Tasks.operators.length > 0) {
    reset.able('svg')
    hideElement($info);
  }

  if ((Tasks.operators.includes("*") || Tasks.operators.includes("/"))) {
    Tasks.numbers.length > 0 ? next.able('text') : next.unable('text');
  } 
  else if (Tasks.operators.includes("+") || Tasks.operators.includes("-")) {
    next.able('text');
  }
});