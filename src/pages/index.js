import Card from "../components/Card.js";
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";
import '../pages/index.css';

import { 
  config,
  items,
  editProfilePopup,
  addCardPopup,
  imgPopupBig,
  editForm,
  addCardForm,
  editProfileOpenButton,
  addCardOpenButton,
  nameInput,
  jobInput,
  placeInput,
  urlInput,
  cardListSelector
} from '../utils/constants.js';

// инструкции валидации
const editFormValidator = new FormValidator(config, editForm);
const cardFormValidator = new FormValidator(config, addCardForm);

// инструкции для списка, фугкция создания карточки

const createCard = (...args) => new Card('.template-card', handleCardClick, ...args).generateCard();


//создаем список в секции
const defaultCardList = new Section({ data: items, renderer }, cardListSelector);
defaultCardList.renderItems();

// форма добавления карточки
const cardForm = new PopupWithForm(addCardPopup, cardFormSubmitHandler);

//попап с картинкой
const imgPopup = new PopupWithImage(imgPopupBig);

//форма редактирование профиля
const profileForm = new PopupWithForm(editProfilePopup, profileFormSubmitHandler);

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

//хендлер сабмита формы профиля
function profileFormSubmitHandler(evt, { name, desc })  {
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

//установка слушателей закрытия
cardForm.setEventListeners();
profileForm.setEventListeners();
imgPopup.setEventListeners();

//валидация форм
editFormValidator.enableValidation();
cardFormValidator.enableValidation();


