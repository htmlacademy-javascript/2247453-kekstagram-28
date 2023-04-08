const thumbnailsList = document.querySelector('.pictures');
const thumbnailsTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (thumbnails) => {

  const thumbnailsListFragment = document.createDocumentFragment();

  thumbnails.forEach(({ id, url, description, likes, comments }) => {
    const thumbnailsElement = thumbnailsTemplate.cloneNode(true);
    thumbnailsElement.querySelector('.picture__img').src = url;
    thumbnailsElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailsElement.querySelector('.picture__likes').textContent = likes;
    thumbnailsElement.querySelector('.picture__img').alt = description;
    thumbnailsElement.dataset.thumbnailId = id;
    thumbnailsListFragment.appendChild(thumbnailsElement);
  });

  thumbnailsList.appendChild(thumbnailsListFragment);
};

export { renderThumbnails };
