const showInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass); // показывает ошибку при не валидности поля
  errorElement.textContent = inputElement.validationMessage; //сначала подтягивается текст
  errorElement.classList.add(errorClass); // потом у него меняется класс
};

const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass); // убирает ошибку при валидности поля
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass, ) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const hasNoInputValue = (inputList) => {
  return inputList.every(inputElement => {
    return inputElement.value.length === 0;
  });
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => { // отключение кнопки
  buttonElement.classList.add(inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => { // включение кнопки
  buttonElement.classList.remove(inactiveButtonClass);
};

const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => { // переключение состояние кнопки сабмит
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList) || hasNoInputValue(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }

};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault(); // больше добавлять не надо, достаточно на одном обработчике формы
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });

  if (hasNoInputValue(inputList)) {
    toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
  }
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(formElement => {
    setEventListeners(formElement,
      config.inputSelector,
      config.submitButtonSelector,
      config.inputErrorClass,
      config.errorClass,
      config.inactiveButtonClass);
  });
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid', // без . потому что это класс, а не селектор
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'error_visible'
});
