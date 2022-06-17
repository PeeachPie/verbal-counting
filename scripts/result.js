"use strict";

import { ProblemsResult } from "./modules/problems/result.js";

const $answers = document.querySelector(".answers");
const $total   = document.querySelector(".total");
const $correct = document.querySelector(".correct");
const $home    = document.querySelector(".home");

const problems = new ProblemsResult(JSON.parse(localStorage.getItem("problems")));

console.log(problems)



// показывает результаты ответов
function showAnswers() {
  for (let i = 0; i < problems.questions; i++) {
    let el = document.createElement("div");
    el.className = problems.list[i].right ? "right" : "wrong";
    el.innerHTML = `
    ${problems.list[i].text}
    ${problems.list[i].given == null ? "__" : problems.list[i].given}
    ${problems.list[i].right ? "" : `&nbsp;(${problems.list[i].answer})`}
    `;
    $answers.append(el);
  }
}

// выбирает и устанавливает неправильно решенные примеры
function correctionOfMistakes() {
  localStorage.setItem("problems", JSON.stringify(problems.wrongProblems));
  localStorage.setItem("questions", JSON.stringify(problems.questions - problems.right));
}

// демонстрирует результат тестирования
function showResult() {
  $total.textContent = `Результат: ${problems.right} из ${problems.questions}`;
  showAnswers();
}

window.addEventListener('load', showResult);

if (problems.questions == problems.right) {
  $correct.style.display = "none";
}

$correct.addEventListener("click", () => {
  correctionOfMistakes();
  window.location.href = "../pages/test.html";
});

$home.addEventListener("click", () => {
  window.location.href = "../index.html";
});
