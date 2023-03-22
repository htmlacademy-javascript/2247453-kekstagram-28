import { isEscapeKey, isEnterKey } from './util.js';
import { getCurrentItemByDatasetId, renderBigPictureContent, showComments } from './big-picture-render.js';

const thumbnailsContainer = document.querySelector('.pictures');
const bigPicturePopup = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigImage = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const allCommentCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicturePopup.classList.add('hidden');
  }
};

//Открытие всплывающего окна
function openBigPicture (data) {
  thumbnailsContainer.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      evt.preventDefault();
      bigPicturePopup.classList.remove('hidden');

      document.addEventListener('keydown', (onPopupEscKeydown));

      commentCount.classList.add('hidden'); //Скрывает блок счётчика комментариев
      commentsLoader.classList.add('hidden'); //Скрывает блок загрузки новых комментариев

      document.body.classList.add('modal-open'); //Блокировка скрола на body

      const currentThumbnail = evt.target.closest('[data-thumbnail-id]'); //Получение значения ID из dataset
      const currentPicture = getCurrentItemByDatasetId(data, currentThumbnail); //Запись в переменную элемент с нужным ID
      renderBigPictureContent(currentPicture,bigImage,likesCount,allCommentCount,socialCaption); //Заполнение HTML значениями из объекта
      showComments(socialComments, currentPicture.comments); //Отрисовка комментариев
    }
  });

  thumbnailsContainer.addEventListener('keydown', (evt) => {
    if (evt.target.matches('.picture') && (isEnterKey(evt))) {
      bigPicturePopup.classList.remove('hidden');

      document.addEventListener('keydown', (onPopupEscKeydown));

      commentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');

      document.body.classList.add('modal-open');

      const currentThumbnail = evt.target.closest('[data-thumbnail-id]');
      const currentPicture = getCurrentItemByDatasetId(data, currentThumbnail);
      renderBigPictureContent(currentPicture,bigImage,likesCount,allCommentCount,socialCaption);
      showComments(socialComments, currentPicture.comments);
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
