import Point from './point';
import PointEdit from './point-edit';
import makeData from './info';

const makePoint = (container) => {
  const data = makeData();
  const point = new Point(data);
  const pointEdit = new PointEdit(data);

  container.appendChild(pointEdit.render(container));

  point.onEdit = () => {
    pointEdit.render(container);
    container.replaceChild(pointEdit.element, point.element);
    point.unrender();
  };

  pointEdit.onSubmit = (newData) => {
    data._type = newData.type;
    data._type = newData.type;
    data._time = newData.time;
    data._price = newData.price;
    data._offers = newData.offers;
    data._city = newData.city;
    data._isFavorit = newData.isFavorit;
    data._desc = newData.desc;
    data._imgies = newData.imgies;

    point.update(newData);
    point.render(container);
    container.replaceChild(point.element, pointEdit.element);
    pointEdit.unrender();
  };
};

export default (container, length = false) => {
  if (!length) {
    makePoint(container);
  } else {
    for (let i = 0; i < length; i++) {
      makePoint(container);
    }
  }
};
