import Filter from './filter';
import makePoints from '../trip-point/points';

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

export default (container, names, intalisionPoints, pointsContainer) => {
  container.innerHTML = ``;
  for (let filterName of names) {
    const filterComponent = new Filter(filterName, names.indexOf(filterName) === 0);

    container.appendChild(filterComponent.render(container));
    filterComponent.onFilter = (evt) => {
      const choosenFilterId = evt.target.id;
      const choosenPoints = filterPoints(choosenFilterId, intalisionPoints);
      makePoints(pointsContainer, choosenPoints);
    };
  }
};
