"use strict";

import { ActionButton } from './modules/Buttons.js';
import { Tasks } from './modules/Task.js';

const settings = JSON.parse(localStorage.getItem("settings"));

const tasks = new Tasks(
  {
  container : document.querySelector(".container"),
  resultWindow : document.querySelector(".result"),
  taskWindow : document.querySelector(".task"),
  answerInput : document.querySelector("#answer"),
  problemOutput : document.querySelector(".problem"),
  message: document.querySelector(".message"),
  counter: document.querySelector(".counter")
},
 settings
)

console.log(tasks);

const checkAnsButton = new ActionButton(
  document.querySelector(".check"),
  tasks.showAns.bind(tasks)
);

const newTaskButton = new ActionButton(
  document.querySelector(".new"),
  tasks.create.bind(tasks)
);

window.addEventListener('load', tasks.create.bind(tasks));