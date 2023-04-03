const DEFAULT_VALUE = 100;
const SCALE_STEP = 25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

let scaleValue = DEFAULT_VALUE;

const addImgScale = () => {

  scaleControlSmaller.addEventListener('click', () => {
    if (scaleValue > SCALE_STEP) {
      scaleValue -= SCALE_STEP;
      scaleControlValue.value = `${scaleValue}%`;
      imgPreview.style.transform = `scale(${scaleValue / 100})`;
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    if (scaleValue < 100) {
      scaleValue += SCALE_STEP;
      scaleControlValue.value = `${scaleValue}%`;
      imgPreview.style.transform = `scale(${scaleValue / 100})`;
    }
  });
};

const resetImgScale = () => {
  imgPreview.style.transform = '';
  scaleValue = DEFAULT_VALUE;
  scaleControlValue.value = `${scaleValue}%`;
};

export { addImgScale, resetImgScale };
