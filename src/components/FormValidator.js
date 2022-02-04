export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    const {
      formSelector,
      inputSelector,
      submitButton,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    } = config;

    this._submitButton = this._formElement.querySelector(submitButton);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass); // показывает ошибку при не валидности поля
    errorElement.textContent = inputElement.validationMessage; //сначала подтягивается текст
    errorElement.classList.add(this._errorClass); // потом у него меняется класс
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass); // убирает ошибку при валидности поля
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _hasNoInputValue = () => {
    return this._inputList.every((inputElement) => {
      return inputElement.value.length === 0;
    });
  };

  // отключение кнопки
  _disableSubmitButton = () => {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", "disabled");
  };

  // включение кнопки
  _enableSubmitButton = () => {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute("disabled", "disabled");
  };

  // переключение состояние кнопки сабмит при валидности полей
  _toggleButtonState = () => {
    if (this._hasInvalidInput() || this._hasNoInputValue()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  //фукция стирания ошибок при открытии формы
  resetValidation() {
    this._toggleButtonState(); //проверка состояния кнопки при открытии
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
