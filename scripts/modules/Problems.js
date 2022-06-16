import {getRandom, randomChoice} from './utilits.js';

class Problem {
  constructor() {
    this.given = null;
    this.right = false
  }

  check(value) {
    this.given = value === '' ? null : value;
    this.right = this.given === this.answer;
    return this.right;
  }
}

class AdditionProblem extends Problem {
  constructor(max) {
    super()
    this.operator = "+";
    this.max = max;

    const a = getRandom(0, this.max / 2);
    const b = getRandom(0, this.max / 2);
    this.answer = a + b;
    this.text = `${a} + ${b} = `;
  }
}

class SubtractionProblem extends Problem {
  constructor(max) {
    super()
    this.operator = "-";
    this.max = max;

    const a = getRandom(0, this.max);
    const b = getRandom(0, a);
    this.answer = a - b;
    this.text = `${a} - ${b} = `;
  }
}

class MultiplicationProblem extends Problem {
  constructor(number) {
    super()
    this.operator = "*";
    this.number = number;

    const a = getRandom(0, 10);
    const b = this.number;
    this.answer = a * b;
    this.text = `${a} × ${b} = `;
  }
}

class DivisionProblem extends Problem {
  constructor(number) {
    super()
    this.operator = "/";
    this.number = number;

    const a = this.number;
    const b = getRandom(0, 10);
    this.answer = b;
    this.text = `${a * b} ÷ ${a} = `;
  }
}

class Problems {
  constructor(settings) {
    this.operators = settings.operators;
    this.numbers = settings.numbers;
    this.max = settings.max;
    this.questions = settings.questions;
    // this.list = settings.problems;
  }

  // reset() {
  //   this.operators = [];
  //   this.numbers = [];
  //   this.max = 10;
  //   this.questions = 5;
  //   this.problems = [];
  // }

  _createProblem() {
    const operator = randomChoice(this.operators);
    switch (operator) {
      case "+":
        return new AdditionProblem(this.max);
      case "-":
        return new SubtractionProblem(this.max);
      case "/":
        return new DivisionProblem(randomChoice(this.numbers));
      case "*":
        return new MultiplicationProblem(randomChoice(this.numbers));
      default:
        return "some Error";
    }
  }

  create() {
    let problems = [];
    for (let i = 1; i <= this.questions; i++) {
      let problem = this._createProblem();
      problems.push(problem);
    }
    this.list = problems;
    return problems;
  }

  // подсчитывает поличество правильных ответов
  get right() {
    return this.problems.reduce((total, problem) => problem.right ? total + 1 : total, 0);
  }

  // находит неправильные примеры
  get wrongProblems() {
    return this.problems.filter((problem) => !problem.right);
  }
}

export { Problems }

// a = new Problems

// console.log(a.createProblems())
