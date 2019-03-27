import makeTripOffer from './offers';
import MainPoint from './main-point';
class Point extends MainPoint {
  constructor({type, time, price, offers, city}) {
    super();
    this._type = type;
    this._time = time;
    this._price = price;
    this._offers = offers;
    this._city = city;
    this._onEdit = null;
  }

  _onButtonClick() {
    this._onEdit();
  }

  set onEdit(fn) {
    if (typeof fn === `function`) {
      this._onEdit = fn;
    }
  }

  _getTitle(city, type) {
    if (type.transport) {
      return `${type.name} to ${city}`;
    } else {
      return `Check into ${type.name.toLowerCase()}`;
    }
  }

  get template() {
    return `<article class="trip-point">
    <i class="trip-icon">${this._type.icon}</i>
    <h3 class="trip-point__title">${this._getTitle(this._city, this._type)}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${this._getTimeTable()}</span>
      <span class="trip-point__duration">${this._getDuration()}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
    ${makeTripOffer(this._offers)}
    </article>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onButtonClick.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onButtonClick.bind(this));
  }

  update(newData) {
    this._type = newData.type;
    this._time = newData.time;
    this._price = newData.price;
    this._offers = newData.offers;
    this._city = newData.city;
  }
}

export default Point;
