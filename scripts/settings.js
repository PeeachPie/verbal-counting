"use strict";

import { ProblemsSettings } from './modules/problems/settings.js';
import { OperatorButton, NumberButton, ActionButton } from './modules/Buttons.js';
import { Questions, Max } from './modules/Slider.js';

const $info =  document.querySelector(".info");

const $questionsSettings = document.querySelector(".questions-settings");
const $operatorsSettings = document.querySelector(".operators-settings");

const $numbersBlock = document.querySelector(".numbers");
const $maxBlock = document.querySelector(".max");

const settings = new ProblemsSettings()

// меняет страницу настроек
function changeSettingsPage(previousPage, nextPage) {
  hideElement(previousPage);
  showElement(nextPage);
}

// сбрасывает настройки
function resetSettings() {
  numbers.forEach(num => num.unselect());
  operators.forEach(operator => operator.unselect());

  settings.reset();
  questions.reset();
  max.reset();

  next.unable('text')
  reset.unable('svg')

  showElement($info)
}

new ActionButton(document.querySelector("#start"), 
  function () {
  localStorage.setItem("settings", JSON.stringify(settings));
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
  document.querySelector(".questions")
);

const max = new Max(
  document.querySelector(".max")
);

const operators = Array.from(document.querySelectorAll(".operators .choose > *"))
  .map((operator, i) => (new OperatorButton(operator, ['+', '-', '*', '/'][i])))

const numbers = Array.from(document.querySelectorAll(".numbers .choose > *"))
  .map((number, i) => (new NumberButton(number, i + 1)))

settings.watchSlider(questions)
settings.watchSlider(max)
settings.watchButtons(operators)
settings.watchButtons(numbers)

// выбирает делители/множители до нажатой кнопки включая ее
function selectNumbersBefore(button) {
  console.log(button)
  console.log(numbers)
  const num = button.value - 1;
  for (let j = num; j >= 0; j--) {
    if (!numbers[j].active) {
      console.log(numbers[j])
      settings.setValueInList(button);
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
  numbers[i].element.addEventListener("click", () => {numbers[i].doubleClick(selectNumbersBefore.bind(null, numbers[i]))});
}

window.addEventListener("unload", resetSettings);

window.addEventListener("click", () => {
  // console.log(settings)
  settings.operators.includes("+") || settings.operators.includes("-")
    ? showElement($maxBlock)
    : hideElement($maxBlock);
  settings.operators.includes("*") || settings.operators.includes("/")
    ? showElement($numbersBlock)
    : hideElement($numbersBlock);

  if (settings.operators.length > 0) {
    reset.able('svg')
    hideElement($info);
  }

  if ((settings.operators.includes("*") || settings.operators.includes("/"))) {
    settings.numbers.length > 0 ? next.able('text') : next.unable('text');
  } 
  else if (settings.operators.includes("+") || settings.operators.includes("-")) {
    next.able('text');
  }
});