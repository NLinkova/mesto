export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButton: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid', // без . потому что это класс, а не селектор
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'error_visible'
};

export const items = [
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

//Popups modal windows
export const editProfileModal = document.querySelector('.popup_type_edit-profile');
export const addCardModal = document.querySelector('.popup_type_add-card');
export const editAvatarModal = document.querySelector('.popup_type_edit-avatar');
export const editProfilePopup = '.popup_type_edit-profile';
export const addCardPopup = '.popup_type_add-card';
export const deleteCardPopup = '.popup_type_delete-card';
export const imgPopupBig = '.popup_type_image';
export const editAvatarPopup = '.popup_type_edit-avatar';
export const editForm = editProfileModal.querySelector('.popup__form_profile');
export const avatarForm = editAvatarModal.querySelector('.popup__form_avatar');
export const addCardForm = addCardModal.querySelector('.popup__form_place');

//Buttons
export const editProfileOpenButton = document.querySelector('.profile__edit-button');
export const editAvatarButton = document.querySelector('.profile__avatar-button');
export const addCardOpenButton = document.querySelector('.profile__add-button');
export const deleteCardButton = document.querySelector('.element__delete-button');
export const submitButton = document.querySelector('.popup__submit-button');
export const submitCardButton = addCardModal.querySelector('.popup__submit-button');
export const submitProfileButton = editProfileModal.querySelector('.popup__submit-button');
export const submitAvatarButton = editAvatarModal.querySelector('.popup__submit-button');

// Form data
export const nameInput = editForm.querySelector('.popup__field_type_name');
export const jobInput = editForm.querySelector('.popup__field_type_desc');

export const placeInput = addCardForm.querySelector('.popup__field_type_place');
export const urlInput = addCardForm.querySelector('.popup__field_type_url');

// Template
export const cardListSelector = '.elements';
export const templateSelector = '.template-card';
export const userNameSelector = '.profile__name';
export const userAboutSelector = '.profile__description';
export const userAvatarSelector = '.profile__avatar';
