"use strict";

import { Task } from './modules/Tasks.js';
import { Problems } from './modules/Problems.js';
import { OperatorButton, NumberButton, ActionButton } from './modules/Buttons.js';
import { Questions, Max } from './modules/Slider.js';

const $info =  document.querySelector(".info");

const $questionsSettings = document.querySelector(".questions-settings");
const $operatorsSettings = document.querySelector(".operators-settings");

const $numbersBlock = document.querySelector(".numbers");
const $maxBlock = document.querySelector(".max");

const Tasks = new Task()
const problems = new Problems()

// меняет страницу настроек
function changeSettingsPage(previousPage, nextPage) {
  hideElement(previousPage);
  showElement(nextPage);
}

// сбрасывает настройки
function resetSettings() {
  numbers.forEach(num => num.unselect());
  operators.forEach(operator => operator.unselect());

  problems.reset();
  questions.reset();
  max.reset();

  next.unable('text')
  reset.unable('svg')

  showElement($info)
}

new ActionButton(document.querySelector("#start"), 
  function () {
  localStorage.setItem("problems", JSON.stringify(problems));
  // localStorage.setItem("questions", JSON.stringify(questions.value));
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
  problems,
  document.querySelector(".questions"),
  )

const max = new Max(
  problems,
  document.querySelector(".max"),
);

const operators = Array.from(document.querySelectorAll(".operators .choose > *"))
  .map((operator, i) => (new OperatorButton(problems, operator, ['+', '-', '*', '/'][i])))

const numbers = Array.from(document.querySelectorAll(".numbers .choose > *"))
  .map((number, i) => (new NumberButton(problems, number, i + 1)))

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

for (let i = 0; i < numbers.length; i++) {
  // numbers[i].element.addEventListener("click", numbers[i].setNumber.bind(numbers[i]));
  numbers[i].element.addEventListener("click", numbers[i].doubleClick.bind(numbers[i], selectNumbersBefore));
}

window.addEventListener("unload", resetSettings);

window.addEventListener("click", () => {
  console.log(problems)
  problems.operators.includes("+") || problems.operators.includes("-")
    ? showElement($maxBlock)
    : hideElement($maxBlock);
  problems.operators.includes("*") || problems.operators.includes("/")
    ? showElement($numbersBlock)
    : hideElement($numbersBlock);

  if (problems.operators.length > 0) {
    reset.able('svg')
    hideElement($info);
  }

  if ((problems.operators.includes("*") || problems.operators.includes("/"))) {
    problems.numbers.length > 0 ? next.able('text') : next.unable('text');
  } 
  else if (problems.operators.includes("+") || problems.operators.includes("-")) {
    next.able('text');
  }
});