import { isEscapeKey, isEnterKey } from './util.js';

const thumbnailsContainer = document.querySelector('.pictures');
const bigPicturePopup = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicturePopup.classList.add('hidden');
  }
};

//Открытие всплывающего окна
function openBigPicture () {
  thumbnailsContainer.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      evt.preventDefault();
      bigPicturePopup.classList.remove('hidden');

      document.addEventListener('keydown', (onPopupEscKeydown));

      commentCount.classList.add('hidden'); //Скрывает блок счётчика комментариев
      commentsLoader.classList.add('hidden'); //Скрывает блок загрузки новых комментариев

      document.body.classList.add('modal-open'); //Блокировка скрола на body
    }
  });

  thumbnailsContainer.addEventListener('keydown', (evt) => {
    if (evt.target.matches('.picture') && (isEnterKey(evt))) {
      bigPicturePopup.classList.remove('hidden');

      document.addEventListener('keydown', (onPopupEscKeydown));

      commentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');

      document.body.classList.add('modal-open');
    }
  });
}

//Закрытие всплывающего окна
function closeBigPicture () {
  bigPictureCloseButton.addEventListener('click', () => {
    bigPicturePopup.classList.add('hidden');
    document.removeEventListener('keydown', (onPopupEscKeydown));
    commentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    document.body.classList.remove('modal-open');
  });

  bigPictureCloseButton.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      bigPicturePopup.classList.add('hidden');
      document.removeEventListener('keydown', (onPopupEscKeydown));
      commentCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      document.body.classList.remove('modal-open');
    }
  });
}

export { openBigPicture,closeBigPicture };
