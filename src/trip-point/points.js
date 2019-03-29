import Point from './point';
import PointEdit from './point-edit';

const updatePoint = (points, pointToUpdate, newData) => {
  const index = points.indexOf(pointToUpdate);
  points[index] = Object.assign({}, points[index], newData);
  return points[index];
};

const removePoint = (points, pointToDelete) => {
  const index = points.indexOf(pointToDelete);
  points.splice(index, 1);
};

export default (container, points) => {
  container.innerHTML = ``;
  for (let point of points) {
    const pointComponent = new Point(point);
    const pointEditComponent = new PointEdit(point);

    container.appendChild(pointComponent.render(container));

    pointComponent.onEdit = () => {
      pointEditComponent.render(container);
      container.replaceChild(pointEditComponent.element, pointComponent.element);
      pointComponent.unrender();
    };

    pointEditComponent.onSubmit = (newData) => {
      const updatedPoint = updatePoint(points, point, newData);

      pointComponent.update(updatedPoint);
      pointComponent.render(container);
      container.replaceChild(pointComponent.element, pointEditComponent.element);
      pointEditComponent.unrender();
    };

    pointEditComponent.onDelete = () => {
      removePoint(points, point);
      container.removeChild(pointEditComponent.element);
      pointEditComponent.unrender();
    };
  }
};
