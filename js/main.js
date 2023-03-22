import { createAllPhotos } from './data.js';
import { getDemoThumbnails } from './thumbnails.js';
import { openBigPicture,closeBigPicture } from './big-picture-popup.js';

const demoData = createAllPhotos();
getDemoThumbnails(demoData);
openBigPicture(demoData);
closeBigPicture();
