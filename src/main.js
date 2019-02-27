import makeFilter from './filter';
import makeTripPoin from './trip-point';
import createArrayOfHTML from './arrayOfHTML';
import {getRandomElementOfArray, getRandomInt} from './random-values';

const filterConteiner = document.querySelector(`.trip-filter`);
const tripDayConteiner = document.querySelector(`.trip-day__items`);
const arrayOfText = [`Taxi to Airport`, `Flight to Geneva`, `Drive to Chamonix`, `Check into a hotel`];

const arrayOfHTMLFilters = [makeFilter(`everything`, true),
  makeFilter(`future`),
  makeFilter(`past`)];

const arrayOfHTMLTripPoins = createArrayOfHTML(7, makeTripPoin(
    getRandomElementOfArray(arrayOfText),
    [`10:00`, `11:00`],
    `1H 30M`,
    20
));

filterConteiner.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters.join(``));
tripDayConteiner.insertAdjacentHTML(`beforeend`, arrayOfHTMLTripPoins.join(``));

const arrayOfFilters = document.querySelectorAll(`.trip-filter__item`);

const doFilter = () => {
  tripDayConteiner.innerHTML = ``;
  const legthOfArray = getRandomInt(0, 7);
  const array = createArrayOfHTML(legthOfArray, makeTripPoin(
      getRandomElementOfArray(arrayOfText),
      [`10:00`, `11:00`],
      `1H 30M`,
      20
  ));
  tripDayConteiner.insertAdjacentHTML(`beforeend`, array.join(``));
};

arrayOfFilters.forEach((el) => el.addEventListener(`click`, doFilter));
