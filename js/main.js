import { getData, getDataOnSuccess } from './api.js';
import { addClosePictureHandler } from './big-picture-popup.js';
import { addOpenPictureEditorHandler, addClosePictureEditorHandler } from './upload-picture-form.js';
import { setUserFormSubmit } from './upload-picture-logic.js';
import { addImgScale } from './upload-picture-scale.js';
import { addImgEffects } from './upload-picture-effects.js';
import { addImgPreview } from './upload-picture-preview.js';

getData(getDataOnSuccess);
addClosePictureHandler();
addOpenPictureEditorHandler();
addClosePictureEditorHandler();
setUserFormSubmit();
addImgScale();
addImgEffects();
addImgPreview();
