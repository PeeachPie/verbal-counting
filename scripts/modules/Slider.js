class SliderSetter {
  constructor(settings, element) {
    this.settings = settings;
    this.numberInput = element.querySelector('input[type="number"]');
    this.rangeInput = element.querySelector('input[type="range"]');
    this.max = Number(this.rangeInput.max)
    this.min = Number(this.rangeInput.min)

    this.numberInput.addEventListener("change", () => {
      this.setInputValue('number')
      this.setValue()
    })

    this.rangeInput.addEventListener("input", () => {
      this.setInputValue('range')
      this.setValue()
    })
  }

  // устанавливает значение по селектору в настройки
  setValue() {
    this.settings[this.selector] = this.value
  }

  // синхронизирует значения из input type="range" и input type="number"
  setInputValue(type) {
    this.value = Number(type === 'number' ? this.numberInput.value : this.rangeInput.value);
    this.numberInput.value = this.rangeInput.value = this.value;
    this.changeSliderFill(this.perсent)
  }

  // изменяет заполнение input type="range"
  changeSliderFill (perсent) {
    perсent > 70 ? perсent-- : perсent++;
    this.rangeInput.style.background = `linear-gradient(90deg, 
    rgb(212,0,255) ${perсent}%, 
    #1f1f1f ${perсent}%)`;
  }

  // сбрасывает заполнение и значение
  reset() {
    this.changeSliderFill(0);
    this.rangeInput.value = this.numberInput.value = this.min;
  }

  // возвращает процент текущего значения от максимального
  get perсent() {
    return ((this.value - this.min) / (this.max - this.min)) * 100
  }
}

class Questions extends SliderSetter {
  constructor (settings, numberInput, rangeInput) {
    super(settings, numberInput, rangeInput);
    this.value = 5;
    this.selector = 'questions'
  }
}

class Max extends SliderSetter {
  constructor (settings, numberInput, rangeInput) {
    super(settings, numberInput, rangeInput);
    this.value = 10;
    this.selector = 'max'
  }
}

export {Questions, Max}