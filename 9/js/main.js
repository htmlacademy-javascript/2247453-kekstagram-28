import { createAllPhotos } from './data.js';
import { getDemoThumbnails } from './thumbnails.js';
import { addOpenPictureHandler,addClosePictureHandler } from './big-picture-popup.js';

const demoData = createAllPhotos();
getDemoThumbnails(demoData);
addOpenPictureHandler(demoData);
addClosePictureHandler();
