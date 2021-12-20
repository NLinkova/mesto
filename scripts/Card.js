const imageModalCaption = document.querySelector('.popup__caption');
const imageModalImg = document.querySelector('.popup__image');


import openPopup from './index.js';
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = document.querySelector('.template-card').content;;
  }

  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
   return cardElement;
  }

  _likeButton(e) {
    e.target.classList.toggle('element__like_active');
  };

  _deleteCard(e) {
    e.target.closest('.element').remove();
  };

  _setEventListeners = () => {
    const imageModal = document.querySelector('.popup_type_image');
    this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteCard);
    this._element.querySelector('.element__like').addEventListener('click', this._likeButton);
    this._element.querySelector('.element__image').addEventListener('click', () => {
      imageModalCaption.textContent = this._name;
      imageModalImg.src = this._link;
      imageModalImg.alt = this._name;
      openPopup(imageModal)
    });
  };

  generateCard = () => {
    this._element = this._getTemplate();

    const cardElementImage = this._element.querySelector('.element__image');
    const cardElementTitle = this._element.querySelector('.element__title');
    cardElementImage.setAttribute('src', this._link);
    cardElementImage.setAttribute('alt', this._name);
    cardElementTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  };
}

