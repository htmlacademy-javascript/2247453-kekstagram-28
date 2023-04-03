import { getDemoThumbnails } from './thumbnails.js';
import { addOpenPictureHandler } from './big-picture-popup.js';
import { showAlert } from './util.js';
import { showMessage } from './upload-picture-form.js';

const TARGET_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '333/',
};

const messageType = {
  OK: 'success',
  ERR: 'error',
};

//Функция для получения данных
const getData = () => fetch(`${TARGET_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then((data) => {
    getDemoThumbnails(data);
    addOpenPictureHandler(data);
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные. Попробуйте обновить страницу');
  });

//Функция для отправки данных
const sendData = (body) => fetch(
  `${TARGET_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    } else {
      showMessage(messageType.OK);
    }
  })
  .catch(() => {
    showMessage(messageType.ERR);
  });

export { getData, sendData };
