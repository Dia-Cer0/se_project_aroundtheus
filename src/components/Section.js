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

      this._appendItem(newElement);
    });
  };

  addItem = (newItem) => {
    this._container.prepend(this.renderer(newItem));
  };

  _appendItem = (element) => {
    this._container.append(element);
  };
}
