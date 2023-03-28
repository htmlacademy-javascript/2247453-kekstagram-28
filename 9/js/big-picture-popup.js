import { isEscapeKey, isEnterKey } from './util.js';
import { showBigImage } from './big-picture-render.js';

const thumbnailsContainer = document.querySelector('.pictures');
const bigPicturePopup = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

//Функция закрытия всплывающего окна через ESC
const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicturePopup.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

//Открытие всплывающего окна
const openBigPicture = (data, evt) => {
  evt.preventDefault();
  bigPicturePopup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);

  document.body.classList.add('modal-open'); //Блокировка скрола на body

  showBigImage(data, evt);
};

//Закрытие всплывающего окна
const closeBigPicture = () => {
  bigPicturePopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);

  document.body.classList.remove('modal-open');
};

//Обработчики открытия всплывающего окна
function addOpenPictureHandler (data) {
  thumbnailsContainer.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      openBigPicture(data, evt);
    }
  });

  thumbnailsContainer.addEventListener('keydown', (evt) => {
    if (evt.target.matches('.picture') && (isEnterKey(evt))) {
      openBigPicture(data, evt);
    }
  });
}

//Обработчики закрытия всплывающего окна
function addClosePictureHandler () {
  bigPictureCloseButton.addEventListener('click', () => {
    closeBigPicture();
  });

  bigPictureCloseButton.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closeBigPicture();
    }
  });
}

export { addOpenPictureHandler,addClosePictureHandler };
