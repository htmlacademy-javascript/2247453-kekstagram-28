import { hasDuplicates } from './util.js';

const pictureEditorForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');

const hashtagRegCheck = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(pictureEditorForm);

const inputHashtagsCheck = () => {
  if (inputHashtags.value === '') {
    // console.log('Строка тегов пустая');
    return true;
  }

  if (inputHashtags.value.length > 100) {
    // console.log('Строка тегов превышает 100 символов');
    return false;
  }

  const CurrentHashtags = inputHashtags.value.split(' ');

  if (CurrentHashtags.length > 5) {
    // console.log('Больше 5 тегов');
    return false;
  }

  if (hasDuplicates(CurrentHashtags)) {
    // console.log('Повтор тегов');
    return false;
  }

  for (let i = 0; i < CurrentHashtags.length; i++) {
    const element = CurrentHashtags[i];
    if (!hashtagRegCheck.test(element)) {
      // console.log('Один из тегов не валиден');
      return false;
    }
  }

  // console.log('Строка тегов прошла проверки');
  return true;
};

const inputDescriptionCheck = () => {
  if (inputDescription.value.length > 140) {
    // console.log('Описание превышает 140 символов');
    return false;
  }
  return true;
};

pictureEditorForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  const checkHashtags = inputHashtagsCheck();
  const checkDescription = inputDescriptionCheck();
  if (isValid && checkHashtags && checkDescription) {
    // console.log('Можно отправлять');
  } else {
    // console.log('Форма невалидна');
  }
});
