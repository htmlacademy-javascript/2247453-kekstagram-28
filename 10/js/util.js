//Функция генерации случайного числа
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция генерации неповторяющихся ID
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//Функция получения случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Функция проверяет является ли нажатая клавиша ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция проверяет является ли нажатая клавиша Enter
const isEnterKey = (evt) => evt.key === 'Enter';

//Функция проверяет наличие повторов в массиве
function hasDuplicates(arr) {
  const lowerCaseArr = arr.map((item) => item.toLowerCase());
  return new Set(lowerCaseArr).size !== lowerCaseArr.length;
}

export { getRandomInteger,createRandomIdFromRangeGenerator,getRandomArrayElement,isEscapeKey,isEnterKey,hasDuplicates };
