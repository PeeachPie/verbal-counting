// import { ActionButton } from './Buttons.js'
import { randomChoice } from './utilits.js';
import { Problems } from './Problems.js';
class TaskWindow {
  constructor(element, context) {
    this.element = element;
    // this.answerInput = new AnswerInput(elements.answerInput)
    // this.problemOutput = elements.problemOutput;
    // this.checkAnsButton = new ActionButton(
    //   document.querySelector(".check"),
    //   this.showAns.bind(context)
    // )
  }

  // rightAns() {
  //   this.changeBorderColor("rgb(80, 255, 80)");
  //   this.message.textContent = randomChoice(this.rightAnsMessages);
  // }

  // // отображается в случае неправильного ответа
  // wrongAns() {
  //   this.changeBorderColor("rgb(255, 55, 55)");
  //   this.message.textContent = randomChoice(this.wrongAnsMessages);
  // }

  // // показывает результат ответа
  // showAns() {
  //   this.changeWindow(this.taskWindow, this.resultWindow)
  //   this.problems.list[this.counter.taskNumber].check(this.answerInput.element.value) ? this.rightAns() : this.wrongAns();
  //   this.message.style.color = this.color;
  // }
}

class ResultWindow {
  constructor(element, context) {
    this.element = element;
    this.message = element.querySelector('.message')
    // this.
  }
} 

class AnswerInput {
  constructor(element, context) {
    this.element = element;
    // this.addEventListener('change', )
  }
}

class Counter {
  constructor(element, max) {
    this.element = element;
    this.taskNumber = 0;
    this.max = max;
  }

  count() {
    this.element.textContent = `${++this.taskNumber} задание из ${this.max}`;
  }
}

class Tasks {
  constructor(elements, settings) {
    this.containerColor = '#4a4a4a'
    this.problems = new Problems(settings);
    this.problems.create()
    this.container = elements.container;
    this.answerInput = elements.answerInput;
    this.message = elements.message;
    this.problemOutput = elements.problemOutput;
    this.taskWindow = new TaskWindow(elements.taskWindow, this);
    this.resultWindow = new ResultWindow(elements.resultWindow);
    this.counter = new Counter(elements.counter, this.problems.questions);
    this.rightAnsMessages = ["Ты молодец!", "Так держать!", "Отлично!", "Правильно!"]
    this.wrongAnsMessages = ["Ой...", "Ошибка!", "Внимательнее!", "Неправильно!"]

    // this.checkAnsButton = new ActionButton(
    //   document.querySelector(".check"),
    //   this.showAns.bind(this)
    // );

    // this.newTaskButton = new ActionButton(
    //   document.querySelector(".new"),
    //   this.create.bind(this)
    // );
  }

  changeBorderColor(color, boxShadow=false) {
    this.color = color
    this.container.style.border = `0.5vmin solid ${this.color}`;
    this.container.style.boxShadow = boxShadow ? `0 0 1.5vmin ${this.color}` : 'none';
  }

  // создает новое задание
  create() {
    this.counter.count()
    if (this.counter.taskNumber > this.problems.questions) {
      localStorage.setItem("problems", JSON.stringify(this.problems));
      window.location.href = "../pages/result.html";
    } else {
      this.answerInput.value = '';
      this.changeWindow(this.resultWindow, this.taskWindow);
      this.changeBorderColor(this.containerColor);
      this.problemOutput.textContent = this.problems.list[this.counter.taskNumber - 1].text;
    }
  }

  changeWindow(previousWindow, nextWindow) {
    previousWindow.element.style.display = 'none';
    nextWindow.element.style.display = 'block'
  }
  // отображается в случае правильного ответа
  rightAns() {
    this.changeBorderColor("rgb(80, 255, 80)");
    this.message.textContent = randomChoice(this.rightAnsMessages);
  }

  // отображается в случае неправильного ответа
  wrongAns() {
    this.changeBorderColor("rgb(255, 55, 55)");
    this.message.textContent = randomChoice(this.wrongAnsMessages);
  }

  // показывает результат ответа
  showAns() {
    this.changeWindow(this.taskWindow, this.resultWindow);
    this.problems.list[this.counter.taskNumber - 1]
      .check(this.answerInput.value)
        ? this.rightAns()
        : this.wrongAns();
    this.message.style.color = this.color;
    // console.log(this.problems.list[this.counter.taskNumber - 1])
  }
}

export { Tasks }