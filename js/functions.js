//Функция для проверки длины строки

function checkLength(inputString, maxLength) {
  return (inputString.length <= maxLength);
}

checkLength('проверяемая строка', 20);
// checkLength('проверяемая строка', 18);
// checkLength('проверяемая строка', 10);


//Функция для проверки, является ли строка палиндромом

function isPalindrome(inputString) {
  const normalizedString = inputString.replaceAll(' ', '').toLowerCase();
  const reverseString = normalizedString.split('').reverse().join('');
  return (normalizedString === reverseString);
}

isPalindrome('топот');
// isPalindrome ('ДовОд');
// isPalindrome ('Кекс');
// isPalindrome ('Лёша на полке клопа нашёл ');


//Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа

function getNumber(inputString) {
  const trimedString = inputString.toString().replace(/[^0-9]/g, '');
  const result = (trimedString === '') ? NaN : Number(trimedString);
  return result;
}

getNumber('2023 год');
// getNumber('ECMAScript 2022');
// getNumber('1 кефир, 0.5 батона');
// getNumber('а я томат');
// getNumber(2023);
// getNumber(-1);
// getNumber(1.5);

//Функция для формирования адресов файлов

// function getFileName (inputString, minLength, additionalSymbol) {
//   return inputString.padStart(minLength, additionalSymbol);
// }

function getFileName(inputString, minLength, additionalSymbol) {
  if (inputString.length >= minLength) {
    return inputString;
  }
  {
    //обьявляем строку для заполнения
    let augmentedString = inputString;
    //определяем длину добивки
    const additionalLength = additionalSymbol.length;
    //пока строка для заполнения короче минимальной длины, выполняем цикл
    while (augmentedString.length < minLength) {
      //определяем заполняемое пространство
      const fillLength = minLength - augmentedString.length;
      //если длина добивки превышает длину заполняемого пространства
      if (fillLength < additionalLength) {
        //обрезаем добивку с конца
        const cutLength = additionalLength - fillLength;
        additionalSymbol = additionalSymbol.slice(0, -cutLength);
      }
      //Дополняем строку для заполнения
      augmentedString = additionalSymbol + augmentedString;
    }
    return augmentedString;
  }
}

getFileName('1', 2, '0');
// getFileName('1', 4, '0');
// getFileName('q', 4, 'werty');
// getFileName('q', 4, 'we');
// getFileName('qwerty', 4, '0');
