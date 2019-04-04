import Filter from './filter';
import openStats from './stats';

const filterPoints = (filterId, initialData) => {
  switch (filterId) {
    case `filter-everything`:
      return initialData;
    case `filter-future`:
      return initialData.filter((it) => it.timeOfStart > new Date());
    case `filter-past`:
      return initialData.filter((it) => it.timeOfStart < new Date());
    default:
      return initialData;
  }
};

export default (names, getFull, api) => {
  const container = document.querySelector(`.trip-filter`);
  container.innerHTML = ``;
  for (let filterName of names) {
    const filterComponent = new Filter(filterName, names.indexOf(filterName) === 0);

    container.appendChild(filterComponent.render(container));
    filterComponent.onFilter = (evt) => {
      const choosenFilterId = evt.target.id;

      if (document.querySelector(`.statistic`).classList.contains(`visually-hidden`)) {
        getFull(filterPoints, choosenFilterId);
      } else {
        api.getPoints()
          .then((points) => {
            points = filterPoints(choosenFilterId, points);
            openStats(evt, points);
          });
      }
      // const choosenPoints = filterPoints(choosenFilterId, intalisionPoints);
      // makePoints(pointsContainer, choosenPoints);
    };
  }
};
