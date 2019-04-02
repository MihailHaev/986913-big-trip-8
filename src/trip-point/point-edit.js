import makeTravelWays from './travel-ways';
import makeDestination from './destination';
import makeImgies from './imgies';
import MainPoint from './main-point';
import flatpickr from "flatpickr";
import moment from 'moment';

class PointEdit extends MainPoint {
  constructor(data) {
    super();
    this._type = data.type;
    this._timeOfStart = data.timeOfStart;
    this._timeOfEnd = data.timeOfEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._city = data.city;
    this._isFavorit = data.isFavorit;
    this._desc = data.desc;
    this._imgies = data.imgies;

    this._types = data.types;
    this._allOffers = data.allOffers;
    this._cities = data.cities;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);
    this._onChangeFavorit = this._onChangeFavorit.bind(this);
    this._onChangeOffer = this._onChangeOffer.bind(this);
    this._onChangePrice = this._onChangePrice.bind(this);
    this._onChangeTime = this._onChangeTime.bind(this);
    this._onChangeType = this._onChangeType.bind(this);

    this._onSubmit = null;
    this._onDelete = null;

    this._getHoursAndMinutes(this._timeOfStart);
  }

  _makeTime() {
    const time = this._getTimeTable();
    if (time.length > 6) {
      const [dateStart, dateEnd] = time.split(`&nbsp;&mdash; `);
      return `<input class="point__input" type="text" value="${dateStart}" name="date-start" placeholder="19:00">
      <input class="point__input" type="text" value="${dateEnd}" name="date-end" placeholder="21:00">`;
    } else {
      return `<input class="point__input" type="text" value="${time}" name="date-start" placeholder="19:00">`;
    }
  }

  _makeOffers(objOfOffers, offers) {
    const allOffers = [];
    for (let key in objOfOffers) {
      if (objOfOffers.hasOwnProperty(key)) {
        let doCheck = false;
        if (offers[key]) {
          doCheck = true;
        }
        const classText = key.split(` `).join(`-`);
        allOffers.push(`<input class="point__offers-input visually-hidden" type="checkbox" id="${classText}" name="offer" value="${classText}" ${doCheck ? `checked` : ``}>
          <label for="${classText}" class="point__offers-label">
            <span class="point__offer-service">${key}</span> + €<span class="point__offer-price">${objOfOffers[key]}</span>
          </label>`);
      }
    }
    return `<div class="point__offers-wrap">
        ${allOffers.join(``)}
      </div>`.trim();
  }

  _onChangeType(evt) {
    if (evt.target.classList.contains(`travel-way__select-input`)) {
      let val = evt.target.value;
      val = val[0].toUpperCase() + val.slice(1);
      for (let key of this._types) {
        if (key.name === val) {
          this._type = key;
          this._partialUpdate();
        }
      }
    }
  }

  _onChangeTime(evt) {
    const [timeOfStart, timeOfEnd] = evt.target.value.split(` — `);
    let [hour, minute] = timeOfStart.split(`:`);
    this._timeOfStart = moment(this._timeOfStart).set({hour, minute}).toDate();
    [hour, minute] = timeOfEnd.split(`:`);
    this._timeOfEnd = moment(this._timeOfEnd).set({hour, minute}).toDate();
  }

  _onChangePrice(evt) {
    this._price = evt.target.value;
  }

  _onChangeOffer(evt) {
    if (evt.target.classList.contains(`point__offers-input`)) {
      const textOfLabel = this._element
        .querySelector(`label[for="${evt.target.id}"] > .point__offer-service`)
        .textContent;
      if (evt.target.checked) {
        this._offers[textOfLabel] = this._allOffers[textOfLabel];
      } else {
        delete this._offers[textOfLabel];
      }
    }
  }

  _onChangeFavorit(evt) {
    if (evt.target.classList.contains(`point__favorite-input`)) {
      if (evt.target.checked) {
        this._isFavorit = true;
      } else {
        this._isFavorit = false;
      }
    }
  }

  _onResetButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const newData = {};
    newData.type = this._type;
    newData.timeOfStart = this._timeOfStart;
    newData.timeOfEnd = this._timeOfEnd;
    newData.price = this._price;
    newData.offers = this._offers;
    newData.city = this._city;
    newData.isFavorit = this._isFavorit;
    newData.desc = this._desc;
    newData.imgies = this._imgies;
    this._onSubmit(newData);
  }

  set onSubmit(fn) {
    if (typeof fn === `function`) {
      this._onSubmit = fn;
    } else {
      throw new Error(`on Submit is not a function`);
    }
  }

  set onDelete(fn) {
    if (typeof fn === `function`) {
      this._onDelete = fn;
    } else {
      throw new Error(`on Delete is not a function`);
    }
  }

  get template() {
    return `<article class="point">
    <form action="" method="get">
      <header class="point__header">
        <label class="point__date">
          choose day
          <input class="point__input" type="text" placeholder="MAR 18" name="day">
        </label>
  
        <div class="travel-way">
          <label class="travel-way__label" for="travel-way__toggle">${this._type.icon}</label>
          <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
          ${makeTravelWays(this._types, this._type.icon)}
        </div>
        ${makeDestination(this._types, this._cities, this._type, this._city)}
  
        <label class="point__time">
          choose time
          ${this._makeTime()}
        </label>
  
        <label class="point__price">
          write price
          <span class="point__price-currency">€</span>
          <input class="point__input" type="text" value="${this._price}" name="price">
        </label>
  
        <div class="point__buttons">
          <button class="point__button point__button--save" type="submit">Save</button>
          <button class="point__button" type="reset">Delete</button>
        </div>
  
        <div class="paint__favorite-wrap">
          <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorit ? `checked` : ``}>
          <label class="point__favorite" for="favorite">favorite</label>
        </div>
      </header>
  
      <section class="point__details">
        <section class="point__offers">
          <h3 class="point__details-title">offers</h3>
          ${this._makeOffers(this._allOffers, this._offers)}
        </section>
        <section class="point__destination">
          <h3 class="point__details-title">Destination</h3>
          <p class="point__destination-text">${this._desc}</p>
          ${makeImgies(this._imgies)}
        </section>
        <input type="hidden" class="point__total-price" name="total-price" value="">
      </section>
    </form>
  </article>`.trim();
  }

  bind() {
    this._element.querySelector(`article > form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`article > form`).addEventListener(`reset`, this._onResetButtonClick);
    this._element.querySelector(`.travel-way__select`).addEventListener(`change`, this._onChangeType);
    this._element.querySelector(`input[name="date-start"]`).addEventListener(`change`, this._onChangeTime);
    if (this._timeOfStart !== this._timeOfEnd) {
      this._element.querySelector(`input[name="date-end"]`).addEventListener(`change`, this._onChangeTime);
    }
    this._element.querySelector(`input[name="price"]`).addEventListener(`change`, this._onChangePrice);
    this._element.querySelector(`.point__offers-wrap`).addEventListener(`change`, this._onChangeOffer);
    this._element.querySelector(`.paint__favorite-wrap`).addEventListener(`change`, this._onChangeFavorit);
    flatpickr(`input[name="date-start"]`, {enableTime: true,
      altInput: true, altFormat: `H:i`,
      dateFormat: `H:i`, defaultDate: moment(this._timeOfStart).format(`H:mm`)
    });
    flatpickr(`input[name="date-end"]`, {enableTime: true,
      altInput: true, altFormat: `H:i`,
      dateFormat: `H:i`, defaultDate: moment(this._timeOfEnd).format(`H:mm`)
    });
  }

  unbind() {
    this._element.querySelector(`article > form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`article > form`).removeEventListener(`reset`, this._onResetButtonClick);
    this._element.querySelector(`.travel-way__select`).removeEventListener(`change`, this._onChangeType);
    this._element.querySelector(`input[name="date-start"]`).removeEventListener(`change`, this._onChangeTime);
    if (this._timeOfStart !== this._timeOfEnd) {
      this._element.querySelector(`input[name="date-end"]`).removeEventListener(`change`, this._onChangeTime);
    }
    this._element.querySelector(`input[name="price"]`).removeEventListener(`change`, this._onChangePrice);
    this._element.querySelector(`.point__offers-wrap`).removeEventListener(`change`, this._onChangeOffer);
    this._element.querySelector(`.paint__favorite-wrap`).removeEventListener(`change`, this._onChangeFavorit);
  }

  update(newDate) {
    this._type = newDate.type;
    this._timeOfStart = newDate.timeOfStart;
    this._timeOfEnd = newDate.timeOfStart;
    this._price = newDate.price;
    this._offers = newDate.offers;
    this._city = newDate.city;
    this._isFavorit = newDate.isFavorit;
    this._desc = newDate.desc;
    this._imgies = newDate.imgies;
  }
}

export default PointEdit;
