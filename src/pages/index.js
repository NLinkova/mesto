import Api from "../components/Api.js";
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
  // items,
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


const cardApi = new Api({
	url:'https://mesto.nomoreparties.co/v1/cohort-34/cards',
	headers: {
    authorization: '187a8fd4-ac28-43dd-80b6-20429361e8d5',
		'Content-Type': 'application/json'
	}
});

// инструкции для списка, фугкция создания карточки

const createCard = (...args) => new Card('.template-card', handleCardClick, confirmOpenHandler, ...args, cardApi).generateCard();


//создаем список в секции
const defaultCardList = new Section({ data: [], renderer }, cardListSelector);
// defaultCardList.renderItems();

cardApi.getCards()
  .then(data => {
    defaultCardList.renderItems(data);
  }) 
  .catch(err => console.log(err));


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
const userInfoApi = new Api({
	url:'https://nomoreparties.co/v1/cohort-34/users/me',
	headers: {
    authorization: '187a8fd4-ac28-43dd-80b6-20429361e8d5',
		'Content-Type': 'application/json'
	}
});

const currentUser = new UserInfo('profile__name', 'profile__description');

userInfoApi.getUserInfoFromServer()
  .then(data => {    
    currentUser.setUserInfo({ name: data.name, about: data.about});
  })
  .catch(err => console.log(err));

// const currentUser = new UserInfo('profile__name', 'profile__description');
// currentUser.setUserInfo({ name: 'Жак-Ив Кусто', desc: 'Исследователь океана' });

// создание карточек в секции
function renderer(item) {
    // создаание карточки и возвращение ее
    const cardElement = createCard(item.name, item.link, item.owner); //add user
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
function profileFormSubmitHandler(evt, { name, about })  {
  // debugger
  currentUser.setUserInfo({ name: name, about: about });
  userInfoApi.setUserInfoToServer({ name: name, about: about })
    .then(([name, about]) => {
        currentUser.setUserInfo({ name: name, about: about });
    })
    .catch(err => console.log(err));
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
  jobInput.value = currentUserInfo.about;
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

