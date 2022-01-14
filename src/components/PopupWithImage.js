import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__caption');
    this._link = link;
    this._name = name;
  }
  open(name, link) {
    super.open(); //использование родительского метода
    this._popupImageCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  }
}
