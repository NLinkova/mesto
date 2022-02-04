import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageCaption = this._popup.querySelector(".popup__caption");
  }
  open(name, link) {
    super.open();
    this._popupImageCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  }
}
