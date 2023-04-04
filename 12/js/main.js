import {getData} from './api.js';
import { addClosePictureHandler } from './big-picture-popup.js';
import { addOpenPictureEditorHandler, addClosePictureEditorHandler, closePictureEditor, noDataResetClose } from './upload-picture-form.js';
import { setUserFormSubmit } from './upload-picture-logic.js';
import { addImgScale } from './upload-picture-scale.js';
import './upload-picture-effects.js';

getData();
addClosePictureHandler();
addOpenPictureEditorHandler();
addClosePictureEditorHandler();
setUserFormSubmit(closePictureEditor,noDataResetClose);
addImgScale();
