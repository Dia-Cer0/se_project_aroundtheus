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

  createCard = (item, card, foo) => {
    const newCard = new Card(item, card, foo);
    return newCard.getView();
  };

  _setItem = (element) => {
    this._container.append(element);
  };
}
