export default class Section {
  constructor({ data, renderer }, containerSelector, api) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.api =api;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(data) {
    data.forEach(card => {
      this._renderer(card)
    });
  }
}
