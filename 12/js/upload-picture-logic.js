import { hasDuplicates, showAlert } from './util.js';
import { sendData } from './api.js';
import { blockSubmitButton, unblockSubmitButton } from './upload-picture-form.js';

const VALID_TAG = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_LIMIT = 5;

const pictureEditorForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(pictureEditorForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error-text',
});

const getCurrentHashtags = () => inputHashtags.value.split(' ').filter((tag) => tag.trim().length);

const inputHashtagsCheckLength = () => {
  const currentHashtags = getCurrentHashtags();
  return currentHashtags.length <= HASHTAG_LIMIT;
};

const inputHashtagsCheckDuplicates = () => {
  const currentHashtags = getCurrentHashtags();
  return !hasDuplicates(currentHashtags);
};

const inputHashtagsCheckValid = () => {
  if (inputHashtags.value !== '') {
    const currentHashtags = getCurrentHashtags();
    return currentHashtags.every((element) => VALID_TAG.test(element));
  }
  return true;
};

pristine.addValidator(
  inputHashtags,
  inputHashtagsCheckLength,
  'Максимум 5 хэштегов'
);

pristine.addValidator(
  inputHashtags,
  inputHashtagsCheckDuplicates,
  'Хэштеги повторяются'
);

pristine.addValidator(
  inputHashtags,
  inputHashtagsCheckValid,
  'Хэштег содержит ошибку'
);

const setUserFormSubmit = () => {
  pictureEditorForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

const resetPristineErrors = () => pristine.reset();

export { resetPristineErrors,setUserFormSubmit };
