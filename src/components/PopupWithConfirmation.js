import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formSubmitHandler, api) {
    super(popupSelector);
    this._submittButton = this._popup.querySelector('.popup__submit-button');
    // this._popupForm = this._popup.querySelector(".popup__form");
    this._formSubmitHandler = formSubmitHandler;
    this._api = api;
 }

  close() {
    super.close();
 }

//  formSubmitHandler() {

//  }
  setEventListeners() {
    super.setEventListeners();    
    this._submittButton.addEventListener("click", this._formSubmitHandler);
  }
}

