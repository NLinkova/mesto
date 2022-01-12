import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupImageCaption = this._popupSelector.querySelector('.popup__caption');
    this._name = name;
    this._link = link;
  }
  open() {
// debugger
    super.open(); //использование родительского метода

    // const popupImage = this._popupSelector.querySelector('.popup__image')
    // const popupImageCaption = this._popupSelector.querySelector('.popup__caption')
    this._popupImageCaption.textContent = this._name;
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
  }
}
