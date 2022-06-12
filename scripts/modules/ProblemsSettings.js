class Settings {
  // constructor() {
    
  // }

  watchChanges(slider) {
    slider.numberInput.addEventListener("change", () => {
      slider.setInputValue.call(slider, 'number')
      this.setValue(slider)
    })

    slider.rangeInput.addEventListener("input", () => {
      slider.setInputValue.call(slider, 'range')
      this.setValue(slider)
    })
  }

  setValue(slider) {
    this[slider.type] = slider.value;
  }

  // установщик значения по селектору
  setValueInList(button, value) {
    const index = this[button.type].indexOf(value);
    if (index === -1) {
      this[button.type].push(value);
      button.select()
    } else if (this[button.type].length > 1) {
      this[button.type].splice(index, 1);
      button.unselect()
    }
  }
}