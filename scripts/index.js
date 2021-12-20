import Card from "./Card.js";
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
const popupElement = document.querySelector('.popup');
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-card');
const imageModal = document.querySelector('.popup_type_image');

const editForm = editProfileModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

//Buttons
const editProfileOpenButton = document.querySelector('.profile__edit-button');
const addCardOpenButton = document.querySelector('.profile__add-button');

const addCardCloseButton = addCardModal.querySelector('.popup__close-button');
const editProfileCloseButton = editProfileModal.querySelector('.popup__close-button');
const imageModalCloseButton = imageModal.querySelector('.popup__close-button');

const submitPopupButton = document.querySelector('.popup__submit-button');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

// Form data
const nameInput = editForm.querySelector('.popup__field_type_name');
const jobInput = editForm.querySelector('.popup__field_type_desc');

const placeInput = addCardForm.querySelector('.popup__field_type_place');
const urlInput = addCardForm.querySelector('.popup__field_type_url');

const imageModalCaption = imageModal.querySelector('.popup__caption');
const imageModalImg = imageModal.querySelector('.popup__image');

const ESC_KEYCODE = 27;


// инструкции валидации

const editFormValidator = new FormValidator(config, editForm);
const cardFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();


// Template
const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
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
  const cardElement = cardTemplate.cloneNode(true); //тру чтобы все входяшиее элементы сохранились
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardLikeButton = cardElement.querySelector('.element__like');
  const cardDeleteButton = cardElement.querySelector('.element__delete-button');

 // событие лайка
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('element__like_active');
  });
 // событие удаления
  cardDeleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  // popup big image
  cardImage.addEventListener('click', function () {
    imageModalCaption.textContent = data.name;
    imageModalImg.src = data.link;
    imageModalImg.alt = 'Фотография';
    openPopup(imageModal)
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = 'Фотография';

  return cardElement;
};



function renderCard(data) {
  elements.prepend(createCard(data));
};

// initialCards.forEach((data) => {
//   renderCard(data);
// });

//функция открытия любого попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown',  closeByEsc);
  document.addEventListener('click',  closeByOverlayClick);
};

//закрытия
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');

  document.removeEventListener('keydown',  closeByEsc);
  document.removeEventListener('click',  closeByOverlayClick);
};

function submitProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(editProfileModal)
};

function addCardSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard({name: placeInput.value, link: urlInput.value});

  closePopup(addCardModal);
  addCardForm.reset();

  const submitPopupButton = addCardForm.querySelector('.popup__submit-button');
  submitPopupButton.classList.add('popup__submit-button_invalid');
  submitPopupButton.setAttribute("disabled", "disabled");
};

//закрытие по esc
function closeByEsc(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//закрытие по overlay
function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
  }
};

editProfileOpenButton.addEventListener('click', () => {
  openPopup(editProfileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
});

editProfileCloseButton.addEventListener('click', () => {
  closePopup(editProfileModal)
});

addCardOpenButton.addEventListener('click', () => {
  openPopup(addCardModal)
});

addCardCloseButton.addEventListener('click', () => {
  closePopup(addCardModal)
});

imageModalCloseButton.addEventListener('click', () => {
  closePopup(imageModal)
});


editForm.addEventListener('submit', submitProfileForm);
addCardForm.addEventListener('submit', addCardSubmitHandler);


initialCards.forEach((data) => {
  const card = new Card(data);
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.elements').append(cardElement);
});
