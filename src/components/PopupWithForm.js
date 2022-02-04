import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._formSubmitHandler = formSubmitHandler;
    this._formValues = this._popupForm.inputs;
  }
  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__field'));
    this._formValues = {};
    this._inputList.forEach(input => {
       this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  formReset () {
    this._popupForm.reset();
  }

  _handler = (evt) => {
    this._formSubmitHandler(evt, this._getInputValues());
    this.close()
}

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handler);
  }
}
