import { isEscapeKey, isEnterKey } from './util.js';

const pictureLoader = document.querySelector('#upload-file');
const pictureEditor = document.querySelector('.img-upload__overlay');
const pictureEditorCloseButton = document.querySelector('.img-upload__cancel');
const inputHashtags = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');
const pictureEditorForm = document.querySelector('.img-upload__form');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    pictureEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');
    pictureLoader.value = '';
  }
};

const onInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const openPictureEditor = () => {
  pictureEditor.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.classList.add('modal-open');
  inputHashtags.addEventListener('keydown', onInputKeydown);
  inputDescription.addEventListener('keydown', onInputKeydown);
};

const closePictureEditor = () => {
  pictureEditor.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.body.classList.remove('modal-open');
  inputHashtags.removeEventListener('keydown', onInputKeydown);
  inputDescription.removeEventListener('keydown', onInputKeydown);
  pictureEditorForm.reset();
  pictureLoader.value = '';
};

function addOpenPictureEditorHandler () {
  pictureLoader.addEventListener('change', () => {
    openPictureEditor();
  });
}

function addClosePictureEditorHandler () {
  pictureEditorCloseButton.addEventListener('click', () => {
    closePictureEditor();
  });
  pictureEditorCloseButton.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closePictureEditor();
    }
  });
}

export { addOpenPictureEditorHandler, addClosePictureEditorHandler };
