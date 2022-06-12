"use strict";

import { randomChoice } from './modules/utilits.js';
import { ActionButton } from './modules/Buttons.js';
// import { Problems } from './modules/Problems.js';

const questions = JSON.parse(localStorage.questions);
const $container = document.querySelector(".container");
const $result = document.querySelector(".result");
const $task = document.querySelector(".task");
const $problem = document.querySelector(".problem");
const $answer = document.querySelector("#answer");
const $new = document.querySelector(".new");
const $check = document.querySelector(".check");
const $message = document.querySelector(".message");
const $counter = document.querySelector(".counter");

// const createNewTaskButton = new ActionButton(
//   document.querySelector(".new"),
  
// )

// const problems = new Problems()

let counter = 0;

const problems = JSON.parse(localStorage.getItem("problems"));
console.log(problems);
problems.create()

// problems.checkAns = function () {
//   this[counter].given = Number.parseInt($answer.value);
//   $answer.value = "";
//   this[counter].right = this[counter].ans === this[counter].given;
//   counter++;
//   return this[counter - 1].right;
// };

// создает новое задание
function createNewTask(problems) {
  if (counter + 1 > problems.questions) {
    localStorage.setItem("problems", JSON.stringify(problems));
    window.location.href = "../pages/result.html";
  } else {
    $counter.textContent = `${counter + 1} задание из ${problems.questions}`;
    $task.style.display = "block";
    $result.style.display = "none";
    $container.style.borderColor = "#4a4a4a";
    $container.style.boxShadow = 'none'
    $problem.textContent = problems.problems[counter].text;
  }
}

// показывает результат ответа
function showAns() {
  $task.style.display = "none";
  $result.style.display = "block";
  problems.problems[counter].right ? rightAns() : wrongAns();
  counter++;
}

// отображается в случае правильного ответа
function rightAns() {
  $container.style.border = "0.5vmin solid rgb(80, 255, 80)";
  $container.style.boxShadow = '0 0 1.5vmin rgb(80, 255, 80)'
  $message.style.color = "rgb(80, 255, 80)";

  $message.textContent = randomChoice([
    "Ты молодец!",
    "Так держать!",
    "Отлично!",
    "Правильно!",
  ]);
}

// отображается в случае неправильного ответа
function wrongAns() {
  $container.style.border = "0.5vmin solid rgb(255, 55, 55)";
  $container.style.boxShadow = '0 0 1.5vmin rgb(255, 55, 55)'
  $message.style.color = "rgb(255, 55, 55)";
  $message.textContent = randomChoice([
    "Ой...",
    "Ошибка!",
    "Внимательнее!",
    "Неправильно!",
  ]);
}

$check.addEventListener("click", showAns);
$answer.addEventListener("change", showAns);
$new.addEventListener("click", createNewTask.bind(null, problems));

createNewTask(problems);