import { hasDuplicates } from './util.js';

const HASHTAG_LIMIT = 5;

const pictureEditorForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');

const hashtagRegCheck = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(pictureEditorForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error-text',
});

const inputHashtagsCheckLength = () => {
  const currentHashtags = inputHashtags.value.split(' ');
  if (currentHashtags.length > HASHTAG_LIMIT) {
    return false;
  }
  return true;
};

const inputHashtagsCheckDup = () => {
  const currentHashtags = inputHashtags.value.split(' ');
  if (hasDuplicates(currentHashtags)) {
    return false;
  }
  return true;
};

const inputHashtagsCheckReg = () => {
  if (inputHashtags.value !== '') {
    const currentHashtags = inputHashtags.value.split(' ');
    return currentHashtags.every((element) => hashtagRegCheck.test(element));
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
  inputHashtagsCheckDup,
  'Хэштеги повторяются'
);

pristine.addValidator(
  inputHashtags,
  inputHashtagsCheckReg,
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
