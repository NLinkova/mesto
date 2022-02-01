export default class Card {
  constructor({templateSelector, handleCardClick, handleConfirmDelete}, card, user, api) {
    this._card = card;
    this._name = card.name;
    this._link = card.link;    
    this._owner = card.owner._id;
    this._id = card._id;
    this._likes = card.likes;
    this._user = user;
    this._api = api;     
    this._templateSelector = document.querySelector(templateSelector).content; //templateSelector находится в index.js
    this._handleCardClick= handleCardClick;
    this._handleConfirmDelete = handleConfirmDelete;
  }
  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
   return cardElement; 
  }

	removeCard = () => {			
    this._element.remove();
    this._element = null;
	}

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

  _likeHandler () {
    this._element.querySelector('.element__like').classList.toggle("element__like_active");
    // const even = (element) => element._id == this._user;
    this._api.getUserInfoFromServer()
      .then(userData => {
      if (this._likes.some((item) => {return item._id === userData._id})) {
        this._api
          .deleteLike(this._id)
          .then((data) => {
            this._element.querySelector('.element__like').classList.remove("element__like_active"); 
            this._element.querySelector('.element__number').textContent = data.likes.length; 
            this._likes = data.likes; 
          })
          .catch(err => console.log(err));
      } else {
        this._api
            .putLike(this._id)
            .then((data) => {
              this._element.querySelector('.element__like').classList.add("element__like_active"); 
              this._element.querySelector('.element__number').textContent = data.likes.length; 
              this._likes = data.likes; 
            })
            .catch(err => console.log(err));
      }})
  }
  
  
  _setEventListeners = () => {    
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleConfirmDelete(this._id, this._element)
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeHandler(this._element, this._user)
    });
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

