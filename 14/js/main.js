import {getData, dataOnSuccess } from './api.js';
import { addClosePictureHandler } from './big-picture-popup.js';
import { addOpenPictureEditorHandler, addClosePictureEditorHandler } from './upload-picture-form.js';
import { setUserFormSubmit } from './upload-picture-logic.js';
import { addImgScale } from './upload-picture-scale.js';
import './upload-picture-effects.js';
import './upload-picture-preview.js';

getData(dataOnSuccess);
addClosePictureHandler();
addOpenPictureEditorHandler();
addClosePictureEditorHandler();
setUserFormSubmit();
addImgScale();
