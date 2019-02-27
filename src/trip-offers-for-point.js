export default (offers) => {
  offers = offers.map((offer) => `
    <li>
      <button class="trip-point__offer">${offer[0]} +&euro;&nbsp;${offer[1]}</button>
    </li>`
  );
  return `<ul class="trip-point__offers">
  ${offers.join(``)}
  </ul>`;
};
