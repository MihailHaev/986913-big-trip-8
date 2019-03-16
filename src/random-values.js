const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomElementOfArray = (array, count = false) => {
  array = [...array];
  if (count === false) {
    return array[Math.floor(Math.random() * array.length)];
  }
  return new Array(count).fill()
    .map(() => array[Math.floor(Math.random() * array.length)]);
};

const getRandomElementOfSet = (set, count = false) => {
  const array = [...set];
  if (count === false) {
    return array[Math.floor(Math.random() * array.length)];
  }
  return new Set(new Array(count).fill()
  .map(() => array[Math.floor(Math.random() * array.length)]));
};

const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const getRandomDate = (dayPlus = 1, dayMinus = 1) =>
  (Date.now()
  + (Math.floor(Math.random() * dayPlus * 24 * 60) * 60 * 1000)
  - (Math.floor(Math.random() * dayMinus * 24 * 60) * 60 * 1000));

const getRandomElementOfObject = (obj, count = false) => {
  const newObject = {};
  const cloneOfObj = Object.assign({}, obj);
  let keys = Object.keys(cloneOfObj);
  let randomKey = keys[Math.floor(Math.random() * keys.length)];
  if (count === false) {
    newObject[randomKey] = cloneOfObj[randomKey];
    return newObject;
  } else {
    for (let i = 0; i < count; i++) {
      newObject[randomKey] = cloneOfObj[randomKey];
      delete cloneOfObj[randomKey];
      keys = Object.keys(cloneOfObj);
      randomKey = keys[Math.floor(Math.random() * keys.length)];
    }
    return newObject;
  }
};

export {getRandomBoolean, getRandomElementOfArray, getRandomInt, getRandomElementOfSet, getRandomDate, getRandomElementOfObject};
