export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this.renderer = renderer;
    this._classSelector = classSelector;
    this._container = document.querySelector(classSelector);
  }

  printMessage2(message) {
    console.log(message);
  }

  printMessage1() {
    const message2 = this._container;
    console.log(this._items);
    this.renderer();
  }

  renderItems = () => {
    this._items.forEach((item) => {
      const newElement = this.renderer(item);

      this._setItem(newElement);
    });
  };

  addItem = () => {
    this._container.prepend(this.renderer(this._items));
  };

  _setItem = (element) => {
    this._container.append(element);
  };
}
