import Point from './point';
import PointEdit from './point-edit';

const makePoints = (destinations, points, allOffers, api) => {
  const container = document.querySelector(`.trip-day__items`);
  container.innerHTML = ``;

  for (let point of points) {
    const pointComponent = new Point(point);
    const pointEditComponent = new PointEdit(point, destinations, allOffers);

    container.appendChild(pointComponent.render(container));

    pointComponent.onEdit = () => {
      pointEditComponent.render(container);
      container.replaceChild(pointEditComponent.element, pointComponent.element);
      pointComponent.unrender();
    };

    pointEditComponent.onSubmit = (newData) => {
      const buttonSave = pointEditComponent.element.querySelector(`.point__button[type="submit"]`);
      const buttonDel = pointEditComponent.element.querySelector(`.point__button[type="reset"]`);

      const block = () => {
        buttonSave.disabled = true;
        buttonDel.disabled = true;
        buttonSave.textContent = `Saving...`;
      };
      const unblock = () => {
        buttonSave.disabled = false;
        buttonDel.disabled = false;
        buttonSave.textContent = `Save`;
      };

      pointEditComponent.delError();
      block();

      for (let key in newData) {
        if (newData.hasOwnProperty(key)) {
          point[key] = newData[key];
        }
      }
      api.updatePoint({id: point.id, data: point.toRAW()})
        .then((newPoint) => {
          pointComponent.update(newPoint);
          pointComponent.render(container);
          container.replaceChild(pointComponent.element, pointEditComponent.element);
          pointEditComponent.unrender();
          unblock();
        })
        .catch(() => {
          pointEditComponent.error();
          unblock();
        });
    };

    pointEditComponent.onDelete = (id) => {
      const buttonSave = pointEditComponent.element.querySelector(`.point__button[type="submit"]`);
      const buttonDel = pointEditComponent.element.querySelector(`.point__button[type="reset"]`);

      const block = () => {
        buttonSave.disabled = true;
        buttonDel.disabled = true;
        buttonSave.textContent = `Deleting...`;
      };
      const unblock = () => {
        buttonSave.disabled = false;
        buttonDel.disabled = false;
        buttonSave.textContent = `Delete`;
      };

      pointEditComponent.delError();
      block();

      api.deletePoint({id})
        .then(() => api.getPoints())
        .then((newPoints) => {
          makePoints(destinations, newPoints, allOffers, api);
        })
        .catch(() => {
          pointEditComponent.error();
          unblock();
        });
    };
  }
};

export default makePoints;
