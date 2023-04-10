const sliderElement = document.querySelector('.effect-level__slider');
const previewImg = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

const sliderSettings = {
  default: {
    name: '',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  chrome: {
    name: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  sepia: {
    name: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  marvin: {
    name: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  phobos: {
    name: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  heat: {
    name: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3
  },
};

let currentEffectName = '';
let currentEffectUnit = '';

noUiSlider.create(sliderElement, {
  range: {
    'min': sliderSettings.default['min'],
    'max': sliderSettings.default['max']
  },
  step: sliderSettings.default['step'],
  start: sliderSettings.default['start'],
  connect: 'lower'
});

const addImgEffects = () => {
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

    const currentSettings = sliderSettings[selectedEffect];
    currentEffectName = currentSettings['name'];
    currentEffectUnit = currentSettings['unit'];
    sliderElement.noUiSlider.updateOptions({
      range: {
        'min': currentSettings['min'],
        'max': currentSettings['max']
      },
      step: currentSettings['step'],
      start: currentSettings['start']
    });

  });


  // eslint-disable-next-line no-unused-vars
  sliderElement.noUiSlider.on('update', (...rest) => {
    effectLevel.value = sliderElement.noUiSlider.get();
    previewImg.style.filter = `${currentEffectName}(${effectLevel.value}${currentEffectUnit})`;
  });
};

const resetEffect = () => {
  previewImg.className = '';
  previewImg.style.filter = '';
  sliderContainer.classList.add('hidden');
};

export { addImgEffects, resetEffect };
