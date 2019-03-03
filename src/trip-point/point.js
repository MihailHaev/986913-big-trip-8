import makeTripOffer from './offers-for-point';
import info from './info';

export default (text, timeTable, duration, price) => {
  const icons = [{icon: `🏨`, name: `Hotel`,
    offers: [[`Add breakfast`, 20]], regexp: /hotel/ig},
  {icon: `🚗`, name: `Drive`,
    offers: [[`Rent a car`, 20]], regexp: /drive/ig},
  {icon: `🚕`, name: `Taxi`,
    offers: [[`order UBER`, 20], [`Upgrade to business`, 20]], regexp: /taxi/ig},
  {icon: `✈️`, name: `Flight`,
    offers: [[`Upgrade to business`, 20], [`Select meal`, 20]], regexp: /flight/ig}];
  let icon = ``;
  let offers = [];
  for (let i of icons) {
    if (text.match(i.regexp)) {
      icon = i.icon;
      offers = i.offers;
    }
  }
  return `<article class="trip-point">
    <i class="trip-icon">${icon}</i>
    <h3 class="trip-point__title">${text}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${timeTable[0]}&nbsp;&mdash; ${timeTable[1]}</span>
      <span class="trip-point__duration">${duration}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${price}</p>
    ${makeTripOffer(offers)}
    </article>`;
};
