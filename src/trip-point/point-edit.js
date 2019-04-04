import MainPoint from './main-point';
import flatpickr from "flatpickr";
import moment from 'moment';

class PointEdit extends MainPoint {
  constructor(data, destinations, allOffers) {
    super();
    this._id = data.id;
    this._type = data.type;
    this._timeOfStart = data.timeOfStart;
    this._timeOfEnd = data.timeOfEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._isFavorit = data.isFavorit;
    this._desc = data.desc;
    this._destination = data.destination;
    this._destinations = destinations;
    this._allOffers = allOffers;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);
    this._onChangeFavorit = this._onChangeFavorit.bind(this);
    this._onChangeOffer = this._onChangeOffer.bind(this);
    this._onChangePrice = this._onChangePrice.bind(this);
    this._onChangeTime = this._onChangeTime.bind(this);
    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeDestination = this._onChangeDestination.bind(this);

    this._onSubmit = null;
    this._onDelete = null;

    this._getHoursAndMinutes(this._timeOfStart);
  }

  // _addTypeInAllOffers(allOffers) {
  //   const type = this._type.name.toLocaleLowerCase();
  //   if ((allOffers.find((el) => {
  //     if (el.type === type) {
  //       for (let offer of this._offers) {
  //         el.offers.push(offer);
  //       }
  //       return true;
  //     }
  //     return false;
  //   }))) {
  //     return allOffers;
  //   } else {
  //     allOffers.push({type, offers: this._offers});
  //     return allOffers;
  //   }
  // }

  // make for Template
  _makeImgies() {
    const imgies = this._destination.pictures.map((el) => `<img src="${el.src}" alt="${el.description}" class="point__destination-image">`);
    return `<div class="point__destination-images">
    ${imgies.join(``)}
  </div>`;
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

  _makeOffers() {
    const allOffers = [];
    for (let offer of this._offers) {
      const classText = offer.title.split(` `).join(`-`).toLowerCase();
      allOffers.push(`<input class="point__offers-input visually-hidden" type="checkbox" id="${classText}" name="offer" value="${classText}" ${offer.accepted ? `checked` : ``}>
        <label for="${classText}" class="point__offers-label">
          <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
        </label>`);
    }
    return `<div class="point__offers-wrap">
        ${allOffers.join(``)}
      </div>`.trim();
  }

  _makeDestination() {
    let options = [];
    let selectedOption;
    let labelText;
    if (this._type.transport) {
      for (let cityOfSet of this._destinations) {
        options.push(cityOfSet.name);
      }
      selectedOption = this._destination.name;
      labelText = `${this._type.name} to`;
    } else {
      options = this._types.filter((el) => !el.transport)
      .map((el) => el.name.toLowerCase());
      if (this._type.name === `Check-in`) {
        selectedOption = `hotel`;
      } else {
        selectedOption = this._type.name.toLowerCase();
      }
      labelText = `Check into`;
    }

    options = options.map((el) => `<option value="${el}">`);

    return `<div class="point__destination-wrap">
    <label class="point__destination-label" for="destination">${labelText}</label>
     <input class="point__destination-input" list="destination-select" id="destination" value="${selectedOption}" name="destination">
     <datalist id="destination-select">
      ${options.join(``)}
     </datalist>
   </div> `;
  }

  _makeTravelWays(arrayOfWays, selectedIcon) {
    const firstGroup = arrayOfWays.filter((el) => el.transport)
      .map((el) => {
        const lowName = el.name.toLowerCase();
        return `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${lowName}" name="travel-way" value="${lowName}" ${selectedIcon === el.icon ? `checked` : ``}>
        <label class="travel-way__select-label" for="travel-way-${lowName}">${el.icon} ${lowName}</label>`.trim();
      }).join(``);
    const secondGroup = arrayOfWays.filter((el) => !el.transport)
      .map((el) => {
        const lowName = el.name.toLowerCase();
        return `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${lowName}" name="travel-way" value="${lowName}" ${selectedIcon === el.icon ? `checked` : ``}>
        <label class="travel-way__select-label" for="travel-way-${lowName}">${el.icon} ${lowName}</label>`.trim();
      }).join(``);

    return `<div class="travel-way__select">
    <div class="travel-way__select-group">
          ${firstGroup}   
        </div>
        <div class="travel-way__select-group">
          ${secondGroup}    
        </div>
  </div>`.trim();
  }
  // end of make for Template

  _onChangeType(evt) {
    if (evt.target.classList.contains(`travel-way__select-input`)) {
      let val = evt.target.value;
      val = val[0].toUpperCase() + val.slice(1);
      for (let key of this._types) {
        if (key.name === val) {
          this._type = key;
          this._offers = this._allOffers.find((el) => {
            if (el.type === key.name.toLocaleLowerCase()) {
              return true;
            }
            return false;
          });
          if (!this._offers) {
            this._offers = [];
          } else {
            this._offers = this._offers.offers;
          }
          this._partialUpdate();
        }
      }
    }
  }

  _onChangeTime(evt) {
    const target = evt.target;
    if (target.name === `date-start`) {
      const [hour, minute] = target.value.split(`:`);
      this._timeOfStart = moment(this._timeOfStart).set({hour, minute}).toDate();
    } else if (target.name === `date-end`) {
      const [hour, minute] = target.value.split(`:`);
      this._timeOfEnd = moment(this._timeOfEnd).set({hour, minute}).toDate();
    }
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
      this._onDelete(this._id);
    }
  }

  _onChangeDestination(evt) {
    const val = evt.target.value;
    if (this._type.transport) {
      this._destination = this._destinations.find((el) => {
        return val === el.name;
      });
    } else {
      for (let type of this._types) {
        const name = type.name.toLocaleLowerCase();
        if (val === `hotel` && type.name === `check-in`) {
          this._type = type;
          break;
        }
        if (name === val) {
          this._type = type;
          break;
        }
      }
    }
    this._partialUpdate();
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const newData = {};
    newData.type = this._type;
    newData.timeOfStart = this._timeOfStart;
    newData.timeOfEnd = this._timeOfEnd;
    newData.price = this._price;
    newData.offers = this._offers;
    newData.isFavorit = this._isFavorit;
    newData.desc = this._desc;
    newData.destination = this._destination;
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

  delError() {
    this._element.style.border = ``;
  }

  error() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    this._element.style.border = `4px solid red`;
    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
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
          ${this._makeTravelWays(this._types, this._type.icon)}
        </div>
        ${this._makeDestination()}
  
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
          ${this._makeOffers()}
        </section>
        <section class="point__destination">
          <h3 class="point__details-title">Destination</h3>
          <p class="point__destination-text">${this._destination.description}</p>
          ${this._makeImgies()}
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
    this._element.querySelector(`#destination`).addEventListener(`change`, this._onChangeDestination);
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
    this._element.querySelector(`#destination`).removeEventListener(`change`, this._onChangeDestination);
  }

  update(newData) {
    this._type = newData.type;
    this._timeOfStart = newData.timeOfStart;
    this._timeOfEnd = newData.timeOfEnd;
    this._price = newData.price;
    this._offers = newData.offers;
    this._isFavorit = newData.isFavorit;
    this._desc = newData.desc;
    this._destination = newData.destination;
  }
}

export default PointEdit;
