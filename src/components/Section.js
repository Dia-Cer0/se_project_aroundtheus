export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this.renderer = renderer;
    this._classSelector = classSelector;
    this._container = document.querySelector(classSelector);
  }

  renderItems = () => {
    this._items.forEach((item) => {
      const newElement = this.renderer(item);

      this._setItem(newElement);
    });
  };

  addItem = () => {
    console.log(`from render items in section${this._items}`);
    this._container.prepend(this.renderer(this._items));
  };

  _setItem = (element) => {
    this._container.append(element);
  };
}
