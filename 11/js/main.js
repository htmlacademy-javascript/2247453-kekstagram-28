import { createAllPhotos } from './data.js';
import { getDemoThumbnails } from './thumbnails.js';
import { addOpenPictureHandler,addClosePictureHandler } from './big-picture-popup.js';
import { addOpenPictureEditorHandler, addClosePictureEditorHandler } from './upload-picture-form.js';
import './upload-picture-logic.js';
import './upload-picture-scale.js';
import './upload-picture-effects.js';

const demoData = createAllPhotos();
getDemoThumbnails(demoData);
addOpenPictureHandler(demoData);
addClosePictureHandler();
addOpenPictureEditorHandler();
addClosePictureEditorHandler();