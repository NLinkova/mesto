import Popup from "./Popup.js"
import { api } from "../pages/index.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, card, api) {
    super(popupSelector);
    this._submittButton = this._popup.querySelector('.popup__submit-button');
 }

  close() {
    super.close();
 }

 formSubmitHandler (id, element){
  this._submittButton.addEventListener("click", () => {
    api.deleteCard(id)
        .then(() => {
          element.remove();
          this.close();
        })
        .catch(err => console.log(err));
      })
 }

  setEventListeners() {
    super.setEventListeners(); 
  }
}

