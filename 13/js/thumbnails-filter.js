import { getDemoThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const RANDOM_PICTURE_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = imgFiltersForm.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures');

function compareCommentsLength(picA, picB) {
  return picB.comments.length - picA.comments.length;
}

const clearPictures = () => {
  let pictureElement = picturesContainer.querySelector('.picture');

  while (pictureElement) {
    picturesContainer.removeChild(pictureElement);
    pictureElement = picturesContainer.querySelector('.picture');
  }
};

const getRandomPhotos = (photos) => {
  const randomPhotos = [];

  while (randomPhotos.length < RANDOM_PICTURE_COUNT) {
    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhoto = photos[randomIndex];

    if (!randomPhotos.includes(randomPhoto)) {
      randomPhotos.push(randomPhoto);
    }
  }

  return randomPhotos;
};

const getSortedPhotos = (photos) => {

  const SortedPhotos = photos.slice().sort(compareCommentsLength);

  return SortedPhotos;
};

const getFiltersClassChange = () => {

  imgFiltersForm.addEventListener('click', (evt) => {
    const target = evt.target;

    if (!target.classList.contains('img-filters__button')) {
      return;
    }

    imgFiltersButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    target.classList.add('img-filters__button--active');
  });
};

const debouncedPhotoRender = debounce((photos) => {
  clearPictures();
  getDemoThumbnails(photos);
}, RERENDER_DELAY);

const getFiltersRender = (arrCopy) => {

  imgFiltersForm.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.id === 'filter-default') {
      debouncedPhotoRender(arrCopy);
    }
    if (target.id === 'filter-random') {
      debouncedPhotoRender(getRandomPhotos(arrCopy));
    }
    if (target.id === 'filter-discussed') {
      debouncedPhotoRender(getSortedPhotos(arrCopy));
    }
  });
};

export { getFiltersClassChange,getFiltersRender };
