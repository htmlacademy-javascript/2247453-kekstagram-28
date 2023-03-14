//Описание возможных комментариев
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//Описание возможных имён
const NAMES = [
  'Анна',
  'Василий',
  'Галина',
  'Дмитрий',
  'Елена',
  'Жанна',
  'Иван',
  'Ксения',
  'Леонид',
  'Мария'
];

//Значение количества создаваемых объектов
const OBJECT_COUNT = 25;
const LIKE_LOW_LIMIT = 15;
const LIKE_HIGH_LIMIT = 200;
const COMMENT_ID_LIMIT = 999;
const AVATAR_COUNT = 6;
const COMMENTS_LIMIT = 5;

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

//Функция получения случайного ID фото
const generatePhotoId = createRandomIdFromRangeGenerator(1, OBJECT_COUNT);

//Функция получения случайного ID комментария
const generateCommentId = createRandomIdFromRangeGenerator(1, COMMENT_ID_LIMIT);

//Функция создания фото с комментариями
const createPhoto = () => {
  const randomPhotoId = generatePhotoId();
  const randomCommensCount = getRandomInteger(1, COMMENTS_LIMIT);

  const comments = Array.from({length: randomCommensCount}, () => {
    const randomCommentId = generateCommentId();
    return {
      id: randomCommentId, //Любое число. Идентификаторы не должны повторяться.
      avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`, //Это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg.
      message: getRandomArrayElement(COMMENTS), //Вам необходимо взять одно или два случайных предложения.
      name: getRandomArrayElement(NAMES) //Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
    };
  });

  return {
    id: randomPhotoId, //Число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
    url: `photos/${randomPhotoId}.jpg`, //Строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
    description: `Описание фотографии под номером ${randomPhotoId}`, //Cтрока — описание фотографии. Описание придумайте самостоятельно.
    likes: getRandomInteger(LIKE_LOW_LIMIT, LIKE_HIGH_LIMIT), //Число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
    comments //Массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом.
  };
};

const createAllPhotos = Array.from({length: OBJECT_COUNT}, createPhoto);
