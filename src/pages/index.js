import Card from "../components/Card.js";
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";

import '../pages/index.css';


import { 
  config,
  items,
  editProfileModal,
  addCardModal,
  editProfilePopup,
  addCardPopup,
  deleteCardPopup,
  imgPopupBig,
  editAvatarPopup,
  editForm,
  addCardForm,
  avatarForm,
  editProfileOpenButton,
  deleteCardButton,
  addCardOpenButton,
  editAvatarButton,
  nameInput,
  jobInput,
  placeInput,
  urlInput,
  cardListSelector
} from '../utils/constants.js';

// инструкции валидации
const editFormValidator = new FormValidator(config, editForm);
const cardFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarForm);


// инструкции для списка, фугкция создания карточки

const createCard = (...args) => new Card('.template-card', handleCardClick, confirmOpenHandler, ...args).generateCard();


//создаем список в секции
const defaultCardList = new Section({ data: items, renderer }, cardListSelector);
defaultCardList.renderItems();


// форма добавления карточки
const cardForm = new PopupWithForm(addCardPopup, cardFormSubmitHandler);

//попап с картинкой
const imgPopup = new PopupWithImage(imgPopupBig);

//попап удаления картинки
const confirmForm = new PopupWithConfirmation(deleteCardPopup, confirmSubmitHandler);

//форма редактирование профиля
const profileForm = new PopupWithForm(editProfilePopup, profileFormSubmitHandler);

// форма обновления аватара
const editAvatarForm = new PopupWithForm(editAvatarPopup, editFormSubmitHandler);

// экземпляр юсеринфо
const currentUser = new UserInfo('profile__name', 'profile__description');
currentUser.setUserInfo({ name: 'Жак-Ив Кусто', desc: 'Исследователь океана' });

// создание карточек в секции
function renderer(item) {
    // создаание карточки и возвращение ее
    const cardElement = createCard(item.name, item.link);
    this.addItem(cardElement);
    return cardElement;
}

//открытие попапа с картинкой
function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

//хендлер сабмита формы карточки
function cardFormSubmitHandler (evt, { name, link }) { 
  defaultCardList.addItem(createCard(name, link)); 
};

//хендлер сабмита удаления карточки
function confirmSubmitHandler (evt) {
  deleteCard();
}

//хендлер сабмита формы профиля
function profileFormSubmitHandler(evt, { name, desc })  {
  currentUser.setUserInfo({ name: name, desc: desc });
}

//хендлер сабмита обновления аватара
function editFormSubmitHandler(evt, { name, desc })  {
  currentUser.setUserInfo({ name: name, desc: desc });
}


// открытие формы добавления карточки
addCardOpenButton.addEventListener('click', () => {
  cardFormValidator.resetValidation(); //стирает ошибки от предыдущего открытия и меняет кнопку
  cardForm.open();
});

// открытие формы редактирования профиля
editProfileOpenButton.addEventListener('click', () => {
  editFormValidator.resetValidation(); //стирает ошибки от предыдущего открытия и меняет кнопку
  profileForm.open();
  const currentUserInfo = currentUser.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.desc;
});

// открытие формы обновления аватара
editAvatarButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation(); //стирает ошибки от предыдущего открытия и меняет кнопку
  editAvatarForm.open();
});

// открытие формы удаления карточки
function confirmOpenHandler (evt) {
  confirmForm.open();
}



//установка слушателей закрытия
cardForm.setEventListeners();
confirmForm.setEventListeners();
profileForm.setEventListeners();
imgPopup.setEventListeners();
editAvatarForm.setEventListeners();


//валидация форм
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

