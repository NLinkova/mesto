const imageModalCaption = document.querySelector('.popup__caption');
const imageModalImg = document.querySelector('.popup__image');
const ESC_KEYCODE = 27;

export default class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.template-card')
      .content
      .firstElementChild
      .cloneNode(true);
    return cardElement;
  }

  _likeButton(e) {
    e.target.classList.toggle('element__like_active');
  };

  _deleteCard(e) {
    e.target.closest('.element').remove();
  };

  _handleOpenPopup() {
    const imageModal = document.querySelector('.popup_type_image');
    imageModal.classList.add('popup_opened');
    imageModal.src = this._link;
    imageModalCaption.textContent = this._name;
    imageModalImg.src = this._link;
    imageModalImg.alt = this._name;
    document.addEventListener('keydown',  this._closeByEsc);
    document.addEventListener('click',  this._closeByOverlayClick);
  };

  //закрытие по esc
  _closeByEsc = (evt) => {
    const imageModal = document.querySelector('.popup_type_image');
    if (evt.keyCode === ESC_KEYCODE) {
      imageModal.classList.remove('popup_opened');
    }
  };

 //закрытие по overlay
  _closeByOverlayClick = (evt) => {
    const imageModal = document.querySelector('.popup_type_image');
    if (evt.target.classList.contains('popup')) {
      imageModal.classList.remove('popup_opened');
    }
  };

  _setEventListeners=() => {
    this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteCard);
    this._element.querySelector('.element__like').addEventListener('click', this._likeButton);
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup()
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

