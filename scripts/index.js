import Card from "./Card.js";
import { openPopup } from './utils.js';
import { closePopup } from './utils.js';
import FormValidator from "./FormValidator.js";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid', // без . потому что это класс, а не селектор
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'error_visible'
};

//Popups modal windows
const popups = document.querySelectorAll('.popup');
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-card');

const editForm = editProfileModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

//Buttons
const editProfileOpenButton = document.querySelector('.profile__edit-button');
const addCardOpenButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

// Form data
const nameInput = editForm.querySelector('.popup__field_type_name');
const jobInput = editForm.querySelector('.popup__field_type_desc');

const placeInput = addCardForm.querySelector('.popup__field_type_place');
const urlInput = addCardForm.querySelector('.popup__field_type_url');

// инструкции валидации
const editFormValidator = new FormValidator(config, editForm);
const cardFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();


// Template
const elements = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//функция создания карточки
function createCard(data) {
  const card = new Card(data, '.template-card'); //тут определяется templateSelector
  const cardElement = card.generateCard();
  return cardElement
}

function renderCard(data) {
  elements.prepend(createCard(data));
};

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(editProfileModal)
};

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({name: placeInput.value, link: urlInput.value});

  closePopup(addCardModal);
  addCardForm.reset();
};

editProfileOpenButton.addEventListener('click', () => {
  openPopup(editProfileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  editFormValidator.resetValidation(); //стирает ошибки от предыдущего открытия и меняет кнопку
});

addCardOpenButton.addEventListener('click', () => {
  openPopup(addCardModal);
  cardFormValidator.resetValidation(); //стирает ошибки от предыдущего открытия и меняет кнопку
});

// универсальный слушатель для закрытия любого попапа по оверлею и крестику
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__cross')) {
        closePopup(popup)
      }
  })
})


editForm.addEventListener('submit', submitProfileForm);
addCardForm.addEventListener('submit', addCardSubmitHandler);

//цикл для размещения всех карточек
initialCards.forEach((data) => {
  elements.append(createCard(data));
});

