class ActionButton {
  constructor(element, action, event='click') {
    this.element = element;
    this.callAction = action;
    this.element.addEventListener(event, this.callAction.bind(this))
  }

  // делает кнопку доступной
  able(typeOfButtonContent) {
    this.element.style.pointerEvents = "auto"
    typeOfButtonContent === 'text' 
    ? this.element.style.color = "#ebebeb" 
    : this.element.querySelector('path').style.fill = "#ebebeb" 
  }
  
  // делает кнопку недоступной
  unable(typeOfButtonContent) {
    this.element.style.pointerEvents = "none"
    typeOfButtonContent === 'text' 
    ? this.element.style.color = "#777777" 
    : this.element.querySelector('path').style.fill = "#777777"
  }
}

class SettingsButton {
  constructor (element) {
    this.element = element;
    this.active = false;
  }

  // выбирает кнопку
  select() {
    this.element.className = 'selected';
    this.active = true;
  }

  // отменяет выбор кнопки
  unselect() {
    this.element.className = 'unselected';
    this.active = false;
  }

  // обрабатывает событие двойного нажатия
  doubleClick(f) {
    const time = new Date().getTime();
    this.element.addEventListener("click",() => {
        if (new Date().getTime() - time <= 300) {
          f(this);
        }
      },
      { once: true }
    );
  }
}

class NumberButton extends SettingsButton {
  constructor (element, number) {
    super(element);
    this.type = 'numbers'
    this.value = number;
  }
}

class OperatorButton extends SettingsButton {
  constructor (element, operator) {
    super(element);
    this.type = 'operators'
    this.value = operator;
  }
}

export { OperatorButton, NumberButton, ActionButton }