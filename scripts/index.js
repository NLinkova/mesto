let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__field_name');
let jobInput = document.querySelector('.popup__field_desc');
let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__description');
let form = document.querySelector('.popup__form');
let submitPopupButton = document.querySelector('.popup__submit-button');


function togglePopup() {
  if (!popup.classList.contains('popup_open')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
  }

  popup.classList.toggle('popup_open');
}

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);



function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;

  togglePopup()
}

form.addEventListener('submit', formSubmitHandler);

