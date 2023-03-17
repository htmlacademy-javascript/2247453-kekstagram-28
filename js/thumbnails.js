import {createAllPhotos} from './data.js';

const thumbnailsList = document.querySelector('.pictures');
const thumbnailsTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getThumbnails = createAllPhotos();

const thumbnailsListFragment = document.createDocumentFragment();

getThumbnails.forEach(({url, comments, likes}) => {
  const thumbnailsElement = thumbnailsTemplate.cloneNode(true);
  thumbnailsElement.querySelector('.picture__img').src = url;
  thumbnailsElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailsElement.querySelector('.picture__likes').textContent = likes;
  thumbnailsListFragment.appendChild(thumbnailsElement);
});

thumbnailsList.appendChild(thumbnailsListFragment);
