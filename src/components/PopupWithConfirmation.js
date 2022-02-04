import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    super.close();
    this._submitHandler = null;
    this._submittButton = this._popup.querySelector(".popup__submit-button");
  }

  setSubmitAction(callback) {
    this._submitHandler = callback;
  }
  setEventListeners() {
    super.setEventListeners();
    this._submittButton.addEventListener("click", () => {
      this._submitHandler();
    });
  }
}
