export default class Card {
  constructor({templateSelector, handleCardClick, confirmOpenHandler, confirmDeleteHandler, likeHandler}, card, user, api) {
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._user = user;
    this._owner = card.owner._id;
    this._id = card._id;
    this._likes = card.likes;
    this._api = api;     
    this._templateSelector = document.querySelector(templateSelector).content; //templateSelector находится в index.js
    this._confirmSubmitHandler = confirmDeleteHandler;
    this._handleCardClick= handleCardClick;
    this._confirmOpenHandler = confirmOpenHandler;
    this._likeHandler = likeHandler;
    // this._removeCard = this._removeCard.bind(this);
  }
  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
   return cardElement; 
  }

  // _likeHandler(e) {
  //   e.target.classList.toggle('element__like_active');
  // };

	// _removeCard = () => {			
	// 		this._cardApi.deleteCard(this._id)
	// 		.then((data) => {
	// 			this._element.remove();
  //       this._element = null;
	// 		})
	// 		.catch(err => console.log(err));
	// }

   //проверяем лайки
   _isLiked(card) {
    this._element.querySelector('.element__number').textContent = this._likes.length; 
    this._likes.forEach((element) => {
      if (element._id == this._user) {
        this._element.querySelector('.element__like').classList.add("element__like_active");
      } else {
        this._element.querySelector('.element__like').classList.remove("element__like_active");
      }
    });
  }

  _setEventListeners = () => {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._confirmOpenHandler(this._id)
    });
    this._element.querySelector('.element__like').addEventListener('click', this._likeHandler);
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  };

  generateCard = (item) => {
    this._element = this._getTemplate();
    const cardElementImage = this._element.querySelector('.element__image');
    const cardElementTitle = this._element.querySelector('.element__title');
    cardElementImage.setAttribute('src', this._link);
    cardElementImage.setAttribute('alt', this._name);
    cardElementTitle.textContent = this._name;
    this._setEventListeners();
    let myCard = (this._owner == this._user);
    if(!myCard) {
	    this._element.querySelector('.element__delete-button').classList.add('element__delete-button_hidden');
    }
    this._isLiked(this);
    return this._element;
  };
}

