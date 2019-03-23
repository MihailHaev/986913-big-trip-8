import makeFilter from './filter';
import makeTripPoints from './trip-point/points';
import {getRandomInt} from './random-values';

const filterConteiner = document.querySelector(`.trip-filter`);
const tripDayConteiner = document.querySelector(`.trip-day__items`);

makeTripPoints(tripDayConteiner, 7);

const doFilter = () => {
  tripDayConteiner.innerHTML = ``;
  tripDayConteiner.insertAdjacentHTML(`beforeend`, makeTripPoints(getRandomInt(0, 7)));
};

const arrayOfHTMLFilters = [makeFilter(`everything`, true),
  makeFilter(`future`),
  makeFilter(`past`)];

filterConteiner.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters.join(``));

const arrayOfFilters = document.querySelectorAll(`.trip-filter__item`);

arrayOfFilters.forEach((el) => el.addEventListener(`click`, doFilter));
