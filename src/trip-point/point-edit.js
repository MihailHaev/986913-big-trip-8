import makeElement from '../element';
import makeTravelWays from './travel-ways';
import makeOffers from './offers-edit';
import makeDestination from './destination';
import makeImgies from './imgies';

class PointEdit {
  constructor({type, time, price, offers, types, allOffers, cities, city, isFavorit, desc, imgies}) {
    this._type = type;
    this._time = time;
    this._price = price;
    this._offers = offers;
    this._types = types;
    this._allOffers = allOffers;
    this._cities = cities;
    this._city = city;
    this._isFavorit = isFavorit;
    this._desc = desc;
    this._imgies = imgies;
    this._state = {};
    this._element = null;
    this._onSubmit = null;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    this._onSubmit();
  }

  set onSubmit(fn) {
    if (typeof fn === `function`) {
      this._onSubmit = fn;
    }
  }

  get element() {
    return this._element;
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
          <input class="point__input" type="text" value="${this._time.timeOfStart} — ${this._time.timeOfEnd}" name="time" placeholder="00:00 — 00:00">
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
          ${makeOffers(this._allOffers, this._offers)}
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
    this._element.querySelector(`article > form`).addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    this._element.querySelector(`article > from`).addEventListener(`reset`, () => {});
  }

  unbind() {
    this._element.querySelector(`article > form`).removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    this._element.querySelector(`article > from`).removeEventListener(`reset`, () => {});
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

export default PointEdit;
