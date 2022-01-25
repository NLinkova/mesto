export default class Section {
  constructor({ data, renderer }, containerSelector, cardApi) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._cardApi =cardApi;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(data) {
    data.forEach(item => {
      this._renderer(item)
    });
  }
}
