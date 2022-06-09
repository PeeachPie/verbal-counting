class ActionButton {
  constructor(element, action) {
    this.element = element;
    this.callAction = action;
    this.element.addEventListener("click", this.callAction.bind(this))
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
  constructor (settings, element) {
    this.element = element;
    this.active = false;
    this.settings = settings;
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

  // установщик значения по селектору
  setter(selector, value) {
    const index = this.settings[selector].indexOf(value);
    if (index === -1) {
      this.settings[selector].push(value);
      this.select()
    } else if (this.settings[selector].length > 1) {
      this.settings[selector].splice(index, 1);
      this.unselect()
    }
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
  constructor (settings, element, number) {
    super(settings, element);
    this.number = number;
    this.element.addEventListener("click", this.setNumber.bind(this))
    // this.element.addEventListener("click", this.doubleClick.bind(this, selectNumbersBefore))
  }

  // устанавливает значение множителя/делителя в настройки
  setNumber() {
    this.setter("numbers", this.number);
  }

  // // выбирает делители/множители до нажатой кнопки включая ее
  // selectNumbersBefore() {
  //   const num = this.number - 1;
  //   for (let j = num; j >= 0; j--) {
  //     if (!numbers[j].active) {
  //       numbers[j].setNumber();
  //     }
  //   }
  // }
}

class OperatorButton extends SettingsButton {
  constructor (settings, element, operator) {
    super(settings, element);
    this.operator = operator;
    this.element.addEventListener("click", this.setOperator.bind(this))
  }

  // устанавливает оператор в настройки
  setOperator() {
    this.setter("operators", this.operator);
  }
}

export { OperatorButton, NumberButton, ActionButton }