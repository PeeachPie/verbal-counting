"use strict";

import { ActionButton } from './modules/Buttons.js';
import { Tasks } from './modules/Task.js';

const settings = JSON.parse(localStorage.getItem("settings"));
const answerInput = document.querySelector("#answer");

const tasks = new Tasks(
  {
    answerInput,
    container : document.querySelector(".container"),
    resultWindow : document.querySelector(".result"),
    taskWindow : document.querySelector(".task"),
    problemOutput : document.querySelector(".problem"),
    message: document.querySelector(".message"),
    counter: document.querySelector(".counter")
  },
  settings
)

const checkAnsButton = new ActionButton(
  document.querySelector(".check"),
  tasks.showAns.bind(tasks)
);

answerInput.addEventListener('change',   tasks.showAns.bind(tasks))

const newTaskButton = new ActionButton(
  document.querySelector(".new"),
  () => {
    if (tasks.finished) {
      localStorage.setItem("problems", JSON.stringify(tasks.problems));
      window.location.href = "../pages/result.html";
    } else {
      tasks.create()
    }
  }
);

window.addEventListener('load', tasks.create.bind(tasks));