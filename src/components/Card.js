export default class Card {
  constructor(templateSelector, handleCardClick, confirmOpenHandler, card, user, owner, cardApi) {
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    
    this._user = user;
    this._owner = card.owner._id;
    this._id = card._id;
    this._cardApi = cardApi;     
    this._templateSelector = document.querySelector(templateSelector).content; //templateSelector находится в index.js
    this._handleCardClick= handleCardClick;
    this.confirmOpenHandler = confirmOpenHandler;
    this._removeCard = this._removeCard.bind(this);
  }
  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
   return cardElement; 
  }

  _likeButton(e) {
    e.target.classList.toggle('element__like_active');
  };

	_removeCard = () => {			
			this._cardApi.deleteCard(this._id)
			.then((data) => {
				this._element.remove();
        this._element = null;
			})
			.catch(err => console.log(err));
	}

  _setEventListeners = () => {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this.confirmOpenHandler(this._id)
    });
    this._element.querySelector('.element__like').addEventListener('click', this._likeButton);
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
    return this._element;
  };
}

