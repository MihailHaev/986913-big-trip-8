import makePoints from './trip-point/points';
import makeFilters from './filter/filters';
import openStats from './stats';
import openTable from './table';
import API from './trip-point/api';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip/`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const filtersNames = [`everything`, `future`, `past`];
const tableButton = document.querySelector(`a[href="#table"]`);
const statsButton = document.querySelector(`a[href="#stats"]`);

const getFull = (filter, filterId) => {
  const tripDayConteiner = document.querySelector(`.trip-day__items`);
  tripDayConteiner.innerHTML = `Loading route...`;
  let allPoints;
  let allOffers;
  api.getPoints()
    .then((points) => {
      if (filter) {
        allPoints = filter(filterId, points);
      } else {
        allPoints = points;
      }
      api.getOffers()
        .then((offers) => {
          allOffers = offers;
          api.getDestinations()
            .then((destinations) => {
              makePoints(destinations, allPoints, allOffers, api);
            })
            .catch(() => {
              tripDayConteiner.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later`;
            });
        });
    });
};

getFull();
makeFilters(filtersNames, getFull, api);

tableButton.addEventListener(`click`, openTable);
statsButton.addEventListener(`click`, (evt) => {
  api.getPoints()
  .then((points) => {
    openStats(evt, points);
  });
});


