import makeTripPoints from './trip-point/points';
import makeData from './trip-point/data';
import makeFilters from './filter/filters';
import openStats from './openStats';
import openTable from './openTable';

const intalisionPoints = makeData(7);
const filterConteiner = document.querySelector(`.trip-filter`);
const tripDayConteiner = document.querySelector(`.trip-day__items`);
const filtersNames = [`everything`, `future`, `past`];
const tableButton = document.querySelector(`a[href="#table"]`);
const statsButton = document.querySelector(`a[href="#stats"]`);

makeTripPoints(tripDayConteiner, intalisionPoints);
makeFilters(filterConteiner, filtersNames, intalisionPoints, tripDayConteiner);

tableButton.addEventListener(`click`, openTable);
statsButton.addEventListener(`click`, (evt) => {
  openStats(evt, intalisionPoints);
});


