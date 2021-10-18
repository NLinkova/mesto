//Popups modal windows

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

const submitPopupButton = document.querySelector('.popup__submit-button');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

// Form data
const nameInput = editForm.querySelector('.popup__field_type_name');
const jobInput = editForm.querySelector('.popup__field_type_desc');

const placeInput = addCardForm.querySelector('.popup__field_type_place');
const urlInput = addCardForm.querySelector('.popup__field_type_url');

const imageModalTitle = imageModal.querySelector('.popup__title');
const imageModalImg = imageModal.querySelector('.popup__image');

function togglePopup(modalWindow) {
  if (!modalWindow.classList.contains('popup_open')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
  }
  modalWindow.classList.toggle('popup_open');
};

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  togglePopup(editProfileModal)
};


function addCardSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  renderCard({name: placeInput.value, link: urlInput.value})

  togglePopup(addCardModal)
};

editProfileOpenButton.addEventListener('click', () => {
  togglePopup(editProfileModal)
});

editProfileCloseButton.addEventListener('click', () => {
  togglePopup(editProfileModal)
});

addCardOpenButton.addEventListener('click', () => {
  togglePopup(addCardModal)
});

addCardCloseButton.addEventListener('click', () => {
  togglePopup(addCardModal)
});

editForm.addEventListener('submit', formSubmitHandler);

addCardForm.addEventListener('submit', addCardSubmitHandler);



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

const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
const elements = document.querySelector('.elements');

//function handleImageClick() {
  //imageModalTitle.textContent =
//};

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true); //тру чтобы все входяшиее элементы сохранились
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardLikeButton = cardElement.querySelector('.element__like');
  const cardDeleteButton = cardElement.querySelector('.element__delete-button');

  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('element__like_active');
  });

  cardDeleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    handleImageClick();
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = 'Фотография';

  return cardElement;
};

function renderCard(data) {
  elements.prepend(createCard(data));
};

initialCards.forEach((data) => {
  renderCard(data);
});
