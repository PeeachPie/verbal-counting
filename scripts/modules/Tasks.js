import {getRandom, randomChoice} from './utilits.js';

export class Task {
  constructor () {
    this.operators = [];
    this.numbers = [];
    this.max = 10;
    this.questions = 5;
  }

  reset() {
    this.operators = [];
    this.numbers = [];
    this.max = 10;
    this.questions = 5;
  }

  // создает пример
  createProblem(operator, max) {
    let a, b;
    switch (operator) {
      case "+":
        a = getRandom(0, max / 2);
        b = getRandom(0, max / 2);
        return [`${a} + ${b} = `, a + b];
      case "-":
        a = getRandom(0, max);
        b = getRandom(0, a);
        return [`${a} - ${b} = `, a - b];
      case "/":
        a = randomChoice(this.numbers);
        b = getRandom(0, 10);
        return [`${a * b} ÷ ${a} = `, b];
      case "*":
        a = getRandom(0, 10);
        b = randomChoice(this.numbers);
        return [`${a} \u00d7 ${b} = `, a * b];
      default: return 'some Error'
    } 
  }

  // создает примеры
  createProblems() {
    let problems = [] 
    for (let i = 1; i <= this.questions; i++) {
      let equation = this.createProblem(randomChoice(this.operators), this.max);
      problems.push({
        eq: equation[0],
        ans: equation[1],
        given: null,
        right: false,
      });
    }
    return problems
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

