//функция открытия любого попапа
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown',  closeByEsc);
};

//закрытие по esc
export function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//закрытия
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown',  closeByEsc);
};
