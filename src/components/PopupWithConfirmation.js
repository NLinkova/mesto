import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._formSubmitHandler = formSubmitHandler;
 }

  close() {
    super.close();
 }
 _deleteCard(e) {
    e.target.closest('.element').remove();
    this._element = null; // удаляем элемент из ДОМ
    this.close()
  };


//   _handler = (evt) => {
//     this._formSubmitHandler(evt, this._getInputValues());
//     this.close()
//  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._deleteCard);
  }
}
