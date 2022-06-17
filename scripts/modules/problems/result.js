class ProblemsResult {
  constructor(problems) {
    this.list = problems.list;
    this.questions = problems.questions;
  }

  // подсчитывает поличество правильных ответов
  get right() {
    return this.list.reduce((total, problem) => problem.right ? total + 1 : total, 0);
  }

  // находит неправильные примеры
  get wrongProblems() {
    return this.list.filter((problem) => !problem.right);
  }
}

export { ProblemsResult }