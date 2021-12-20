export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown',  closeByEsc);
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown',  closeByEsc);
};
