import makeFilter from './filter';
import makeTripPoins from './trip-point/points';
import {getRandomInt} from './random-values';

const filterConteiner = document.querySelector(`.trip-filter`);
const tripDayConteiner = document.querySelector(`.trip-day__items`);

const doFilter = () => {
  tripDayConteiner.innerHTML = ``;
  const legthOfArray = getRandomInt(0, 7);

  tripDayConteiner.insertAdjacentHTML(`beforeend`, makeTripPoins(legthOfArray));
};

const arrayOfHTMLFilters = [makeFilter(`everything`, true),
  makeFilter(`future`),
  makeFilter(`past`)];

filterConteiner.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters.join(``));
tripDayConteiner.insertAdjacentHTML(`beforeend`, makeTripPoins(7));

const arrayOfFilters = document.querySelectorAll(`.trip-filter__item`);

arrayOfFilters.forEach((el) => el.addEventListener(`click`, doFilter));
