import makeTripOffer from './offers';
import makeElement from '../element';
class Point {
  constructor({type, time, price, offers, city}) {
    this._type = type;
    this._time = time;
    this._price = price;
    this._offers = offers;
    this._city = city;

    this._state = {};
    this._element = null;
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

  get element() {
    return this._element;
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
      <span class="trip-point__timetable">${this._time.timeOfStart}&nbsp;&mdash; ${this._time.timeOfEnd}</span>
      <span class="trip-point__duration">${this._time.duration}</span>
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

  render() {
    this._element = makeElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

export default Point;
