"use strict";

import { randomChoice } from './modules/utilits.js';
import { ActionButton } from './modules/Buttons.js';
import { Problems } from './modules/Problems.js';

const $container = document.querySelector(".container");
const $result = document.querySelector(".result");
const $task = document.querySelector(".task");
const $problem = document.querySelector(".problem");
const $message = document.querySelector(".message");
const $counter = document.querySelector(".counter");

let counter = 0;

const problems = new Problems(JSON.parse(localStorage.getItem("settings")));

const check = new ActionButton(
  document.querySelector(".check"),
  showAns
)

const answer = new ActionButton(
  document.querySelector("#answer"),
  showAns,
  'change'
)

const newTask = new ActionButton(
  document.querySelector(".new"),
  createNewTask.bind(null, problems)
)

problems.create()

// создает новое задание
function createNewTask(problems) {
  console.log(problems);
  if (counter + 1 > problems.questions) {
    localStorage.setItem("problems", JSON.stringify(problems));
    window.location.href = "../pages/result.html";
  } else {
    answer.element.value = "";
    $counter.textContent = `${counter + 1} задание из ${problems.questions}`;
    $task.style.display = "block";
    $result.style.display = "none";
    $container.style.borderColor = "#4a4a4a";
    $container.style.boxShadow = 'none'
    $problem.textContent = problems.list[counter].text;
  }
}

// показывает результат ответа
function showAns() {
  $task.style.display = "none";
  $result.style.display = "block";
  problems.list[counter].check(answer.element.value) ? rightAns() : wrongAns();
  counter++;
}

function changeBorderColor(color) {
  $container.style.border = `0.5vmin solid ${color}`;
  $container.style.boxShadow = `0 0 1.5vmin ${color}`;
  $message.style.color = color;
}

// отображается в случае правильного ответа
function rightAns() {
  changeBorderColor("rgb(80, 255, 80)")
  $message.textContent = randomChoice([
    "Ты молодец!",
    "Так держать!",
    "Отлично!",
    "Правильно!",
  ]);
}

// отображается в случае неправильного ответа
function wrongAns() {
  changeBorderColor("rgb(255, 55, 55)")
  $message.textContent = randomChoice([
    "Ой...",
    "Ошибка!",
    "Внимательнее!",
    "Неправильно!",
  ]);
}

createNewTask(problems);