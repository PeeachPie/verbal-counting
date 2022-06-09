class AdditionProblem {
 constructor(max) {
   this.operator = '+';
   this.max = max;
 }
 create() {
  a = getRandom(0, this.max / 2);
  b = getRandom(0, this.max / 2);
  this.answer = a + b;
  this.text = `${a} + ${b} = `
  return [`${a} + ${b} = `, a + b];
 }
}

class SubtractionProblem {
  constructor(max) {
    this.operator = '-';
    this.max = max;
  }
  create() {
    a = getRandom(0, this.max);
    b = getRandom(0, a);
   this.answer = a - b;
   this.text = `${a} - ${b} = `
  //  return [`${a} + ${b} = `, a + b];

   return [`${a} - ${b} = `, a - b];
  }
}

class MultiplicationProblem {
  constructor(max) {
    this.operator = '*';
    this.max = max;
  }
  create() {
   a = getRandom(0, this.max / 2);
   b = getRandom(0, this.max / 2);
   this.answer = a + b;
   this.text = `${a} + ${b} = `
   return [`${a} + ${b} = `, a + b];
  }
}

class DivisionProblem {
  constructor(max) {
    this.operator = '/';
    this.max = max;
  }
  create() {
   a = getRandom(0, this.max / 2);
   b = getRandom(0, this.max / 2);
   this.answer = a + b;
   this.text = `${a} + ${b} = `
   return [`${a} + ${b} = `, a + b];
  }
}

// class Problem {
//   static types = {
//     addition: AdditionProblem,
//     subtraction: SubtractionProblem,
//     multiplication: MultiplicationProblem,
//     division: DivisionProblem,
//   }
//   create(type, problemSettings) {
//     return new Problem.types[type]()
//   }
// }

class Problems {
  // static types = {
  //   addition: AdditionProblem,
  //   subtraction: SubtractionProblem,
  //   multiplication: MultiplicationProblem,
  //   division: DivisionProblem,
  // }
  constructor() {
    this.operators = [];
    this.numbers = [];
    this.max = 10;
  }

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
}