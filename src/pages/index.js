import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

import "../pages/index.css";

import {
  config,
  templateSelector,
  submitAvatarButton,
  submitCardButton,
  submitProfileButton,
  editProfilePopup,
  addCardPopup,
  deleteCardPopup,
  imgPopupBig,
  editAvatarPopup,
  editForm,
  addCardForm,
  avatarForm,
  editProfileOpenButton,
  addCardOpenButton,
  editAvatarButton,
  nameInput,
  jobInput,
  cardListSelector,
  userAboutSelector,
  userAvatarSelector,
  userNameSelector,
} from "../utils/constants.js";

// инструкции валидации
const editFormValidator = new FormValidator(config, editForm);
const cardFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarForm);

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "187a8fd4-ac28-43dd-80b6-20429361e8d5",
    "Content-Type": "application/json",
  },
});

// форма добавления карточки
const cardForm = new PopupWithForm(addCardPopup, cardFormSubmitHandler);
// const submitCardButton = addCardPopup.querySelector('.popup__submit-button');

//попап с картинкой
const imgPopup = new PopupWithImage(imgPopupBig);

//попап удаления картинки
const confirmForm = new PopupWithConfirmation(deleteCardPopup, api);

//форма редактирование профиля
const profileForm = new PopupWithForm(
  editProfilePopup,
  profileFormSubmitHandler
);

// форма обновления аватара
const editAvatarForm = new PopupWithForm(
  editAvatarPopup,
  avatarFormSubmitHandler
);

// экземпляр инфо юзера
let user;
const currentUser = new UserInfo(
  userNameSelector,
  userAboutSelector,
  userAvatarSelector
);

//создаем список в секции
const defaultCardList = new Section({ data: [], renderer }, cardListSelector);

Promise.all([api.getCards(), api.getUserInfoFromServer()])
  .then(([CardsData, userData]) => {
    user = userData._id;
    defaultCardList.renderItems(CardsData); //  тут отрисовка карточек
    currentUser.setUserInfo(userData); // тут установка данных пользователя
  })
  .catch((err) => console.log(err));

// инструкции для списка, фугкция создания карточки
const createCard = (...args) =>
  new Card(
    {
      templateSelector,
      handleCardClick,
      handleConfirmDelete: (id, element) => {
        confirmForm.open();
        confirmForm.setSubmitAction(() => {
          api
            .deleteCard(id)
            .then(() => {
              element.remove();
              confirmForm.close();
            })
            .catch((err) => console.log(err));
        });
      },
    },
    ...args,
    api
  ).generateCard();

// создаание карточки и возвращение ее
function renderer(item) {
  const cardElement = createCard(item, user);
  defaultCardList.addItem(cardElement);
  return cardElement;
}

//хендлер сабмита формы карточки
function cardFormSubmitHandler(evt, { name, link }) {
  submitCardButton.textContent = "Saving...";
  api
    .postCard({ name: name, link: link })
    .then((data) => {
      defaultCardList.addItem(createCard(data, user));
      cardForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => (submitCardButton.textContent = "Save"));
}

//хендлер сабмита формы профиля
function profileFormSubmitHandler(evt, data) {
  evt.preventDefault();
  // currentUser.setUserInfo(data);
  submitProfileButton.textContent = "Saving...";
  api
    .setUserInfoToServer(data)
    .then((data) => {
      currentUser.setUserInfo(data);
      profileForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => (submitProfileButton.textContent = "Save"));
}

//хендлер сабмита обновления аватара
function avatarFormSubmitHandler(evt, data) {
  evt.preventDefault();
  submitAvatarButton.textContent = "Saving...";
  api
    .setUserAvatarToServer(data)
    .then((res) => {
      currentUser.setUserInfo(res);
      editAvatarForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => (submitAvatarButton.textContent = "Save"));
}

// открытие формы добавления карточки
addCardOpenButton.addEventListener("click", () => {
  cardFormValidator.resetValidation(); //стирает ошибки от предыдущего открытия и меняет кнопку
  cardForm.open();
});

// открытие формы редактирования профиля
editProfileOpenButton.addEventListener("click", () => {
  editFormValidator.resetValidation(); //стирает ошибки от предыдущего открытия и меняет кнопку
  profileForm.open();
  const currentUserInfo = currentUser.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.about;
});

// открытие формы обновления аватара
editAvatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation(); //стирает ошибки от предыдущего открытия и меняет кнопку
  editAvatarForm.open();
});

//открытие попапа с картинкой
function handleCardClick(name, link) {
  imgPopup.open(name, link);
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
