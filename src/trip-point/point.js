import MainPoint from './main-point';
class Point extends MainPoint {
  constructor(data) {
    super();
    this._type = data.type;
    this._timeOfStart = data.timeOfStart;
    this._timeOfEnd = data.timeOfEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._city = data.city;

    this._onButtonClick = this._onButtonClick.bind(this);

    this._onEdit = null;
  }

  _makeTripOffer(offers) {
    const arrayOfOffers = [];

    for (let offer in offers) {
      if (offers.hasOwnProperty(offer)) {
        arrayOfOffers.push(`
      <li>
      <button class="trip-point__offer">${offer} +&euro;&nbsp;${offers[offer]}</button>
      </li>`);
      }
    }

    return `<ul class="trip-point__offers">
    ${arrayOfOffers.join(``)}
    </ul>`;
  }

  _onButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
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
    ${this._makeTripOffer(this._offers)}
    </article>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onButtonClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onButtonClick);
  }

  update(newData) {
    this._type = newData.type;
    this._timeOfStart = newData.timeOfStart;
    this._timeOfEnd = newData.timeOfEnd;
    this._price = newData.price;
    this._offers = newData.offers;
    this._city = newData.city;
  }
}

export default Point;
