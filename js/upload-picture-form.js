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

function openPictureEditor() {
  pictureEditor.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.classList.add('modal-open');
  inputHashtags.addEventListener('keydown', onInputKeydown);
  inputDescription.addEventListener('keydown', onInputKeydown);
}

function closePictureEditor() {
  pictureEditor.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.body.classList.remove('modal-open');
  inputHashtags.removeEventListener('keydown', onInputKeydown);
  inputDescription.removeEventListener('keydown', onInputKeydown);
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

  document.removeEventListener('keydown', onPopupEscKeydown);

  const onCloseButtonClick = () => {
    onClose();
  };
  closeButton.addEventListener('click', onCloseButtonClick);

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  };
  document.addEventListener('keydown', onEscPress);

  const onOutsideClick = (evt) => {
    if (!messageInner.contains(evt.target)) {
      onClose();
    }
  };
  document.addEventListener('click', onOutsideClick);

  function onClose() {
    message.remove();
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
    if (!pictureEditor.classList.contains('hidden')) {
      document.addEventListener('keydown', onPopupEscKeydown);
    }
  }

  document.body.appendChild(message);
};

export { addOpenPictureEditorHandler, addClosePictureEditorHandler, closePictureEditor, blockSubmitButton, unblockSubmitButton, showMessage };
