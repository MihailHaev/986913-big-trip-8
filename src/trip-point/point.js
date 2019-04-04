import MainPoint from './main-point';
class Point extends MainPoint {
  constructor(data) {
    super();
    this._id = data.id;
    this._type = data.type;
    this._timeOfStart = data.timeOfStart;
    this._timeOfEnd = data.timeOfEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._destination = data.destination;

    this._onButtonClick = this._onButtonClick.bind(this);

    this._onEdit = null;
  }
  // make for Template
  _makeTripOffer() {
    const arrayOfOffers = [];

    for (let offer of this._offers) {
      if (offer.accepted) {
        arrayOfOffers.push(`
      <li>
      <button class="trip-point__offer">${offer.title} +&euro;&nbsp;${offer.price}</button>
      </li>`);
      }
    }
    return `<ul class="trip-point__offers">
    ${arrayOfOffers.join(``)}
    </ul>`;
  }
  // end of make for Template
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

  _getTitle() {
    if (this._type.transport) {
      return `${this._type.name} to ${this._destination.name}`;
    } else {
      if (this._type.name === `Check-in`) {
        return `Check into hotel`;
      }
      return `Check into ${this._type.name.toLowerCase()}`;
      // if (this._type.name === `Check-in`) {
      //   return `Check into hotel`;
      // } else if (this._type.name === `Sightseeing`) {
      //   return `Sightseeing into ${this._destination.name}`;
      // } else if (this._type.name === `Restaurant`) {
      //   return `Check into restaurant`;
      // }
      // return `Nothing about this type in base(${this._type.name})`;
    }
  }

  get template() {
    return `<article class="trip-point">
    <i class="trip-icon">${this._type.icon}</i>
    <h3 class="trip-point__title">${this._getTitle()}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${this._getTimeTable()}</span>
      <span class="trip-point__duration">${this._getDuration()}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
    ${this._makeTripOffer()}
    </article>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onButtonClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onButtonClick);
  }

  update(newData) {
    this._id = newData.id;
    this._type = newData.type;
    this._timeOfStart = newData.timeOfStart;
    this._timeOfEnd = newData.timeOfEnd;
    this._price = newData.price;
    this._offers = newData.offers;
    this._destination = newData.destination;
  }
}

export default Point;
