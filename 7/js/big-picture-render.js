function getCurrentItemByDatasetId(array, element) {
  return array.find((item) => item.id === +element.dataset.thumbnailId);
}

function renderBigPictureContent(object,img,likes,comments,caption) {
  img.setAttribute('src', object.url);
  img.setAttribute('alt', object.description);
  likes.textContent = object.likes;
  comments.textContent = object.comments.length;
  caption.textContent = object.description;
}

const showComments = (targetElement, comments) => {
  const commentsListFragment = document.createDocumentFragment();
  targetElement.innerHTML = '';

  comments.forEach((comment) => {
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');

    const socialPicture = document.createElement('img');
    socialPicture.classList.add('social__picture');
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialPicture.width = '35';
    socialPicture.height = '35';

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = comment.message;

    socialComment.appendChild(socialPicture);
    socialComment.appendChild(socialText);

    commentsListFragment.appendChild(socialComment);
  });

  targetElement.appendChild(commentsListFragment);
};

export { getCurrentItemByDatasetId, renderBigPictureContent, showComments };
