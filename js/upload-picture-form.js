import { isEscapeKey, isEnterKey } from './util.js';
import { resetPristineErrors } from './upload-picture-logic.js';
import { resetImgScale } from './upload-picture-scale.js';
import { resetEffect } from './upload-picture-effects.js';

const pictureLoader = document.querySelector('#upload-file');
const pictureEditor = document.querySelector('.img-upload__overlay');
const pictureEditorCloseButton = document.querySelector('.img-upload__cancel');
const inputHashtags = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');
const pictureEditorForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureEditor();
  }
};

const onInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const noDataResetClose = () => {
  pictureEditor.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.body.classList.remove('modal-open');
  inputHashtags.removeEventListener('keydown', onInputKeydown);
  inputDescription.removeEventListener('keydown', onInputKeydown);
};

function openPictureEditor() {
  pictureEditor.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.classList.add('modal-open');
  inputHashtags.addEventListener('keydown', onInputKeydown);
  inputDescription.addEventListener('keydown', onInputKeydown);
}

function closePictureEditor() {
  noDataResetClose();
  pictureEditorForm.reset();
  resetPristineErrors();
  resetImgScale();
  resetEffect();
  pictureLoader.value = '';
}

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
};

const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content.cloneNode(true);
  const message = template.querySelector(`.${type}`);
  const closeButton = message.querySelector(`.${type}__button`);
  const messageInner = template.querySelector(`.${type}__inner`);


  const onCloseButtonClick = () => {
    message.remove();
    closeButton.removeEventListener('click', onCloseButtonClick);
  };
  closeButton.addEventListener('click', onCloseButtonClick);

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };
  document.addEventListener('keydown', onEscPress);

  const onOutsideClick = (evt) => {
    if (!messageInner.contains(evt.target)) {
      message.remove();
      document.removeEventListener('click', onOutsideClick);
    }
  };
  document.addEventListener('click', onOutsideClick);

  document.body.appendChild(message);
};

export { addOpenPictureEditorHandler, addClosePictureEditorHandler, closePictureEditor, blockSubmitButton, unblockSubmitButton, showMessage, noDataResetClose };
