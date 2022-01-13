import Card from "../components/Card.js";
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import { items } from "../utils/initialCards.js";
import { config } from "../utils/configData.js";
import FormValidator from "../components/FormValidator.js";
import '../pages/index.css';

//Popups modal windows
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-card');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imgPopupBig = document.querySelector('.popup_type_image');

const editForm = editProfileModal.querySelector('.popup__form_profile');
const addCardForm = addCardModal.querySelector('.popup__form_place');

//Buttons
const editProfileOpenButton = document.querySelector('.profile__edit-button');
const addCardOpenButton = document.querySelector('.profile__add-button');

// Form data
const nameInput = editForm.querySelector('.popup__field_type_name');
const jobInput = editForm.querySelector('.popup__field_type_desc');

const placeInput = addCardForm.querySelector('.popup__field_type_place');
const urlInput = addCardForm.querySelector('.popup__field_type_url');

// Template
const cardListSelector = '.elements';

// инструкции валидации
const editFormValidator = new FormValidator(config, editForm);
const cardFormValidator = new FormValidator(config, addCardForm);

// инструкции для списка, фугкция создания карточки
const createCard = (...args) => new Card('.template-card', handleCardClick, ...args);

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
    const cardElement = createCard(item.name, item.link).generateCard();
    this.addItem(cardElement);
    return cardElement;
}

//открытие попапа с картинкой
function handleCardClick(name, link) {
  imgPopup._link = link;// передали данные
  imgPopup._name= name;
  imgPopup.open();
}

//хендлер сабмита формы карточки
function cardFormSubmitHandler () {
  defaultCardList.addItem(createCard(placeInput.value, urlInput.value).generateCard());
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

//валидация форм
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

