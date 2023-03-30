import { hasDuplicates } from './util.js';

const VALID_TAG = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_LIMIT = 5;

const pictureEditorForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(pictureEditorForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error-text',
});

function getCurrentHashtags() {
  return inputHashtags.value.split(' ').filter((tag) => tag.trim().length);
}

const inputHashtagsCheckLength = () => {
  const currentHashtags = getCurrentHashtags();
  if (currentHashtags.length > HASHTAG_LIMIT) {
    return false;
  }
  return true;
};

const inputHashtagsCheckDuplicates = () => {
  const currentHashtags = getCurrentHashtags();
  if (hasDuplicates(currentHashtags)) {
    return false;
  }
  return true;
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

pictureEditorForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    // console.log('Можно отправлять');
  } else {
    // console.log('Форма невалидна');
  }
});
