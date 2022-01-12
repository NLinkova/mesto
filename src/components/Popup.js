export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // debugger
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
    this._removeEventListeners()
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__cross")) {
        this.close();
      }
    });
  }

  _removeEventListeners() {
     this._popupSelector.removeEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__cross")) {
        this.close();
      }
    });
}

}
