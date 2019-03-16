export default (objOfOffers, offers) => {
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
};
