import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, card, api) {
    super(popupSelector);
    super.close();
    this._card = card;
    this._api = api;
    this._submitHandler = null;
    this._submittButton = this._popup.querySelector('.popup__submit-button');
 }

 setSubmitAction(callback) {
   debugger
  this._submitHandler = callback;
  }
  setEventListeners() {
    super.setEventListeners(); 
    this._submittButton.addEventListener("click", this._submitHandler)
      // this._api.deleteCard(id)   
      //     .then(() => {   
      //       element.remove();  
      //       this.close();   
      //     })   
      //     .catch(err => console.log(err)); 
      // }) 
  }

}


//  formSubmitHandler (id, element){
//   this._submittButton.addEventListener("click", () => {
//     this._api.deleteCard(id)
//         .then(() => {
//           element.remove();
//           this.close();
//         })
//         .catch(err => console.log(err));
//       })
//  }
