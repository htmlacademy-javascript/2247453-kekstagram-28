import { createAllPhotos } from './data.js';
import { getDemoThumbnails } from './thumbnails.js';
import { openBigPicture,closeBigPicture } from './big-picture-popup.js';
import './big-picture-render.js';

getDemoThumbnails(createAllPhotos());
openBigPicture();
closeBigPicture();
