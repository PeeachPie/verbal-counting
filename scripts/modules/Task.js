import { randomChoice } from './utilits.js';
import { ProblemsCreate } from './problems/create.js';

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
    this.finished = false;
    this.elements = elements;
    this.containerColor = '#4a4a4a'
    this.problems = new ProblemsCreate(settings);
    this.problems.create()
    this.container = elements.container;
    this.counter = new Counter(elements.counter, this.problems.questions);
    this.rightAnsMessages = ["Ты молодец!", "Так держать!", "Отлично!", "Правильно!"]
    this.wrongAnsMessages = ["Ой...", "Ошибка!", "Внимательнее!", "Неправильно!"]
  }

  _changeBorderColor(color, boxShadow=false) {
    this.color = color
    this.container.style.border = `0.5vmin solid ${this.color}`;
    this.container.style.boxShadow = boxShadow ? `0 0 1.5vmin ${this.color}` : 'none';
  }

  // создает новое задание
  create() {
    if (this.counter.taskNumber >= this.problems.questions) {
      this.finished = true;
      // localStorage.setItem("problems", JSON.stringify(this.problems));
      // window.location.href = "../pages/result.html";
    } else {
      this.counter.count()
      this.elements.answerInput.value = '';
      this._changeWindow(this.elements.resultWindow, this.elements.taskWindow);
      this._changeBorderColor(this.containerColor);
      this.elements.problemOutput.textContent = this.problems.list[this.counter.taskNumber - 1].text;
    }
  }

  // меняет страницу
  _changeWindow(previousWindow, nextWindow) {
    previousWindow.style.display = 'none';
    nextWindow.style.display = 'block'
  }

  // отображается в случае правильного ответа
  _rightAns() {
    this._changeBorderColor("rgb(80, 255, 80)");
    this.elements.message.textContent = randomChoice(this.rightAnsMessages);
  }

  // отображается в случае неправильного ответа
  _wrongAns() {
    this._changeBorderColor("rgb(255, 55, 55)");
    this.elements.message.textContent = randomChoice(this.wrongAnsMessages);
  }

  // показывает результат ответа
  showAns() {
    this._changeWindow(this.elements.taskWindow, this.elements.resultWindow);
    this.problems.list[this.counter.taskNumber - 1]
      .check(this.elements.answerInput.value)
        ? this._rightAns()
        : this._wrongAns();
    this.elements.message.style.color = this.color;
  }
}

export { Tasks }