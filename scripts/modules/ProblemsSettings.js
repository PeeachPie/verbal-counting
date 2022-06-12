class Settings {
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

  watchButton(button) {
    button.element.addEventListener("click", this.setValueInList.bind(this, button))
    console.log("watchButton")
  }

  watchButtons(buttons) {
    buttons.forEach(button => this.watchButton(button))
  }

  watchSlider(slider) {
    slider.numberInput.addEventListener("change", () => {
      slider.synchronizeInput('number')
      this.setValue(slider)
    })

    slider.rangeInput.addEventListener("input", () => {
      slider.synchronizeInput('range')
      this.setValue(slider)
    })
  }

  setValue(slider) {
    this[slider.type] = slider.value;
  }

  // установщик значения по селектору
  setValueInList(button) {
    const index = this[button.type].indexOf(button.value);
    if (index === -1) {
      this[button.type].push(button.value);
      button.select()
    } else if (this[button.type].length > 1) {
      this[button.type].splice(index, 1);
      button.unselect()
    }
  }
}

export { Settings }