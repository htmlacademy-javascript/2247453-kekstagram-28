const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const bigImage = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const allCommentCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const BATCH_OF_COMMENTS = 5;
let commentShown = 0;

//Функция получения элемента массива по dataset ID
function getCurrentItemByDatasetId(array, element) {
  return array.find((item) => item.id === +element.dataset.thumbnailId);
}

//Функция отображения комментариев
const showComments = (targetElement, comments) => {
  const commentsListFragment = document.createDocumentFragment();
  if (commentShown === 0) {
    targetElement.innerHTML = '';
  }

  const commentsToShow = Math.min(BATCH_OF_COMMENTS, comments.length - commentShown);

  for (let i = commentShown; i < commentShown + commentsToShow; i++) {
    const comment = comments[i];

    const socialCommentElement = socialComment.cloneNode(true);
    socialCommentElement.querySelector('.social__picture').src = comment.avatar;
    socialCommentElement.querySelector('.social__picture').alt = comment.name;
    socialCommentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(socialCommentElement);
  }

  targetElement.appendChild(commentsListFragment);

  commentShown += commentsToShow;

  commentCount.textContent = `${commentShown} из ${comments.length} комментариев`;

  if (commentShown >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', () => {
      showComments(targetElement, comments);
    });
  }

};

const showBigImage = (data, evt) => {
  commentShown = 0;
  const currentThumbnail = evt.target.closest('[data-thumbnail-id]'); //Получение значения ID из dataset
  const currentPicture = getCurrentItemByDatasetId(data, currentThumbnail); //Запись в переменную элемент с нужным ID
  bigImage.src = currentPicture.url; //Заполнение HTML значениями из объекта
  bigImage.alt = currentPicture.description;
  likesCount.textContent = currentPicture.likes;
  allCommentCount.textContent = currentPicture.comments.length;
  socialCaption.textContent = currentPicture.description;
  showComments(socialComments, currentPicture.comments); //Отрисовка комментариев
};

export { showBigImage };
