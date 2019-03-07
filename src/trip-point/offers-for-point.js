export default (offers) => {
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
};
