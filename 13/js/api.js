import { getDemoThumbnails } from './thumbnails.js';
import { addOpenPictureHandler } from './big-picture-popup.js';
import { showAlert } from './util.js';
import { showMessage, closePictureEditor } from './upload-picture-form.js';
import { getFiltersClassChange,getFiltersRender } from './thumbnails-filter.js';

const TARGET_URL = 'https://28.javascript.pages.academy/kekstagram';

let dataArray = [];

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const messageType = {
  OK: 'success',
  ERR: 'error',
};

const dataOnSuccess = (data) => {
  const arrCopy = data.slice();
  getDemoThumbnails(data);
  addOpenPictureHandler(data);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  getFiltersClassChange();
  getFiltersRender(arrCopy);
};

//Функция для получения данных
const getData = (OnSuccess) => fetch(`${TARGET_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then((data) => {
    dataArray = data; //???
    OnSuccess(data);
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
      closePictureEditor();
      showMessage(messageType.OK);
    }
  })
  .catch(() => {
    showMessage(messageType.ERR);
  });

export { getData, sendData, dataOnSuccess, dataArray };
