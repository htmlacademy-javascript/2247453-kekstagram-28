const sliderElement = document.querySelector('.effect-level__slider');
const previewImg = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

let currentEffectName = '';
let currentEffectUnit = '';

noUiSlider.create(sliderElement, {
  range: {
    'min': 0,
    'max': 1
  },
  step: 0.1,
  start: 1,
  connect: 'lower'
});

effectsList.addEventListener('change', (evt) => {
  const selectedEffect = evt.target.value;

  if (selectedEffect === 'none') {
    sliderContainer.classList.add('hidden');
    previewImg.className = '';
    currentEffectName = '';
    currentEffectUnit = '';
    previewImg.style.filter = '';
  } else {
    sliderContainer.classList.remove('hidden');
    previewImg.className = `effects__preview--${selectedEffect}`;
  }

  if(selectedEffect === 'chrome') {
    currentEffectName = 'grayscale';
    currentEffectUnit = '';
    sliderElement.noUiSlider.updateOptions({
      range: {
        'min': 0,
        'max': 1
      },
      step: 0.1,
      start: 1
    });
  }

  if(selectedEffect === 'sepia') {
    currentEffectName = 'sepia';
    currentEffectUnit = '';
    sliderElement.noUiSlider.updateOptions({
      range: {
        'min': 0,
        'max': 1
      },
      step: 0.1,
      start: 1
    });
  }

  if(selectedEffect === 'marvin') {
    currentEffectName = 'invert';
    currentEffectUnit = '%';
    sliderElement.noUiSlider.updateOptions({
      range: {
        'min': 0,
        'max': 100
      },
      step: 1,
      start: 100
    });
  }

  if(selectedEffect === 'phobos') {
    currentEffectName = 'blur';
    currentEffectUnit = 'px';
    sliderElement.noUiSlider.updateOptions({
      range: {
        'min': 0,
        'max': 3
      },
      step: 0.1,
      start: 3
    });
  }

  if(selectedEffect === 'heat') {
    currentEffectName = 'brightness';
    currentEffectUnit = '';
    sliderElement.noUiSlider.updateOptions({
      range: {
        'min': 1,
        'max': 3
      },
      step: 0.1,
      start: 3
    });
  }

});


// eslint-disable-next-line no-unused-vars
sliderElement.noUiSlider.on('update', (...rest) => {
  effectLevel.value = sliderElement.noUiSlider.get();
  previewImg.style.filter = `${currentEffectName}(${effectLevel.value}${currentEffectUnit})`;
  // console.log(currentEffectName);
  // console.log(effectLevel.value);
  // console.log(previewImg.style.filter);
});

const resetEffect = () => {
  previewImg.className = '';
  previewImg.style.filter = '';
  sliderContainer.classList.add('hidden');
};

export { resetEffect };
