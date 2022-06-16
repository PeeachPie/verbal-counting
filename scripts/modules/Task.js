class TaskWindow {
  constructor(element) {
    this.element = element;
    this.problemOutput = element.querySelector('.problem');
  }
}

class ResultWindow {
  constructor(element) {
    this.element = element;
    this.message = element.querySelector('.message')
  }
} 

class AnswerInput {
  constructor(element) {
    this.element = element;
  }
}

class Counter {
  constructor(element, max) {
    this.element = element;
    this.taskNumber = 0;
    this.max = max;
  }

  count() {
    // this.counter++
    this.element.textContent = `${++this.counter} задание из ${problems.questions}`;
  }
}

class Tasks {
  constructor(elements, problems) {
    this.containerColor = '#4a4a4a'
    this.problems = problems;
    this.container = elements.container;
    this.taskWindow = new TaskWindow(elements.taskWindow);
    this.resultWindow = new ResultWindow(elements.resultWindow);
    this.counter = new Counter(elements.counter, this.problems.questions);
    this.rightAnsMessages = ["Ты молодец!", "Так держать!", "Отлично!", "Правильно!"]
    this.wrongAnsMessages = ["Ой...", "Ошибка!", "Внимательнее!", "Неправильно!"]
    // this.resultMessage = element.querySelector('.message');
    // this.problemOutput = element.querySelector('.problem');
    // this.anwerInput = element.querySelector('.message');
    // this.counter = 0;
  }

  changeBorderColor(color, boxShadow=false) {
    this.color = color
    this.element.style.border = `0.5vmin solid ${this.color}`;
    this.element.style.boxShadow = boxShadow ? `0 0 1.5vmin ${this.color}` : 'none';
    // this.message.style.color = color;
  }

  // создает новое задание
  create() {
    console.log(problems);
    this.counter.count()
    if (this.counter.taskNumber > this.problems.questions) {
      localStorage.setItem("problems", JSON.stringify(problems));
      window.location.href = "../pages/result.html";
    } else {
      // answer.element.value = "";
      // this.counterOutput.textContent = `${counter + 1} задание из ${problems.questions}`;
      this.changeWindow(this.resultWindow, this.taskWindow)
      this.changeBorderColor(this.containerColor)
      this.problemOutput.textContent = this.problems.problems[this.counter.taskNumber].text;
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
    this.changeWindow(this.taskWindow, this.resultWindow)
    this.problems.list[this.counter.number].check(answer.element.value) ? this.rightAns() : this.wrongAns();
    this.message.element.style.color = this.color;
    // counter++;
  }
}