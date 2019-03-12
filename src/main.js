import makeFilter from './filter';
import makeTripPoins from './trip-point/points';
import {getRandomInt} from './random-values';
import Point from './trip-point/point';
import PointEdit from './trip-point/point-edit';
import makeData from './trip-point/info';

const filterConteiner = document.querySelector(`.trip-filter`);
const tripDayConteiner = document.querySelector(`.trip-day__items`);
const data = makeData();
const point = new Point(data);
const pointEdit = new PointEdit(data);

tripDayConteiner.appendChild(pointEdit.render());

point.onEdit = () => {
  pointEdit.render();
  tripDayConteiner.replaceChild(pointEdit.element, point.element);
  point.unrender();
};

pointEdit.onSubmit = () => {
  point.render();
  tripDayConteiner.replaceChild(point.element, pointEdit.element);
  pointEdit.unrender();
};

const doFilter = () => {
  tripDayConteiner.innerHTML = ``;
  const legthOfArray = getRandomInt(0, 7);

  tripDayConteiner.insertAdjacentHTML(`beforeend`, makeTripPoins(legthOfArray));
};

const arrayOfHTMLFilters = [makeFilter(`everything`, true),
  makeFilter(`future`),
  makeFilter(`past`)];

filterConteiner.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters.join(``));

const arrayOfFilters = document.querySelectorAll(`.trip-filter__item`);

arrayOfFilters.forEach((el) => el.addEventListener(`click`, doFilter));
