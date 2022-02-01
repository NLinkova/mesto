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
  templateSelector,
  editProfileModal,
  addCardModal,
  editAvatarModal,
  editProfilePopup,
  addCardPopup,
  deleteCardPopup,
  imgPopupBig,
  editAvatarPopup,
  editForm,
  addCardForm,
  avatarForm,
  editProfileOpenButton,
  submitButton,
  deleteCardButton,
  addCardOpenButton,
  editAvatarButton,
  nameInput,
  jobInput,
  cardListSelector
} from '../utils/constants.js';



// инструкции валидации
const editFormValidator = new FormValidator(config, editForm);
const cardFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarForm);


const api = new Api({
	url:'https://mesto.nomoreparties.co/v1/cohort-34',
	headers: {
    authorization: '187a8fd4-ac28-43dd-80b6-20429361e8d5',
		'Content-Type': 'application/json'
	}
});


// форма добавления карточки
const cardForm = new PopupWithForm(addCardPopup, cardFormSubmitHandler);

//попап с картинкой
const imgPopup = new PopupWithImage(imgPopupBig);

//попап удаления картинки
//!! проблема с сабмитом формы
const confirmForm = new PopupWithConfirmation(deleteCardPopup, () => {
  api.deleteCard(id)
          .then((data) => {
            this._element.remove();
          })
          .catch(err => console.log(err));
});

//форма редактирование профиля
const profileForm = new PopupWithForm(editProfilePopup, profileFormSubmitHandler);

// форма обновления аватара
const editAvatarForm = new PopupWithForm(editAvatarPopup, avatarFormSubmitHandler);

// экземпляр инфо юзера
let user;
let avatar;
const currentUser = new UserInfo('profile__name', 'profile__description', '.profile__avatar');
//here
api.getUserInfoFromServer()
  .then((data) => {    
    currentUser.setUserInfo({ name: data.name, about: data.about});
    avatar = data.avatar;
    user = data._id;
    currentUser.setUserAvatar(avatar);
  })
  .catch(err => console.log(err));



// инструкции для списка, фугкция создания карточки
const createCard = (...args) => 
   new Card({
    templateSelector,
    handleCardClick, 
    handleConfirmDelete, 
    likeHandler
   },
    ...args, api).generateCard()
;

//создаем список в секции
const defaultCardList = new Section({ data: [], renderer }, cardListSelector);
// создание карточек в секции
api.getCards()
  .then(data => {
    defaultCardList.renderItems(data);
  }) 
  .catch(err => console.log(err));


// создаание карточки и возвращение ее
function renderer(item) { // item
    const cardElement = createCard(item, user); 
    this.addItem(cardElement);
    return cardElement;
}


//хендлер сабмита формы карточки
function cardFormSubmitHandler (evt, { name, link }) { 
  // debugger
  api.postCard({ name: name, link: link })
  .then((data) => {        
    addCardModal.querySelector(".popup__submit-button").textContent = 'Сохранение...';
    defaultCardList.addItem(createCard(data, user));
    cardForm.close();
  }) 
  .catch(err => console.log(err));
};


// хендлер сабмита удаления карточки
function handleConfirmDelete () {  
  confirmForm.open();
    api.deleteCard(this._id)
          .then((data) => {
            this._element.remove();
            confirmForm.close();
          })
          .catch(err => console.log(err));
}



// хендлер лайка карточки
function likeHandler () {
  this._element.querySelector('.element__like').classList.remove("element__like_active");
  const even = (element) => element._id == this._user;
    if (this._likes.some(even)) {
      api.deleteLike(this._id)
      .then((data) => {
        this._element.querySelector('.element__like').classList.remove("element__like_active");
        this._element.querySelector('.element__number').textContent = data.likes.length;         
      })
      .catch(err => console.log(err));
    } else {
      api.putLike(this._id)
        .then((data) => {
          this._element.querySelector('.element__like').classList.add("element__like_active");
          this._element.querySelector('.element__number').textContent = data.likes.length;
        })
        .catch(err => console.log(err));
    }
}

//хендлер сабмита формы профиля
function profileFormSubmitHandler(evt, { name, about })  {
  currentUser.setUserInfo({ name: name, about: about });
  api.setUserInfoToServer({ name: name, about: about })
    .then((data) => {
      editProfileModal.querySelector(".popup__submit-button").textContent = 'Сохранение...';
        currentUser.setUserInfo({ name: name, about: about });
        profileForm.close();
    })
    .catch(err => console.log(err));
}




//хендлер сабмита обновления аватара
function avatarFormSubmitHandler (evt, avatar)  {
  // debugger
  evt.preventDefault();
  api.setUserAvatarToServer(avatar)
    .then(data => {
      editAvatarModal.querySelector(".popup__submit-button").textContent = 'Сохранение...';
      currentUser.setUserAvatar(avatar);
      editAvatarForm.close();
    })
    .catch(err => console.log(err));
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


// // открытие формы удаления карточки
// function confirmOpenHandler (evt) {
//   confirmForm.open();
// }

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

