import makeTripOffer from './offers-for-point';

<<<<<<< HEAD
export default ({type, city, desc, time, imgs, price, offers, isFavorit = false}) => `<article class="trip-point">
    <i class="trip-icon">${type.icon}</i>
    <h3 class="trip-point__title">${type.name}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${time.timeOfStart}&nbsp;&mdash; ${time.timeOfEnd}</span>
      <span class="trip-point__duration">${time.duration}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${price}</p>
    ${makeTripOffer(offers)}
    </article>`;
=======
export default ({type, time, price, offers}) => {
  return `<article class="trip-point">
  <i class="trip-icon">${type.icon}</i>
  <h3 class="trip-point__title">${type.name}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${time.timeOfStart}&nbsp;&mdash; ${time.timeOfEnd}</span>
    <span class="trip-point__duration">${time.duration}</span>
  </p>
  <p class="trip-point__price">&euro;&nbsp;${price}</p>
  ${makeTripOffer(offers)}
  </article>`;
};
>>>>>>> a28a0b58c4099e6d457bd9831037a840a963d20c
