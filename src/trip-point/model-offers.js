class ModelOffers {
  constructor(data) {
    this.type = data.type;
    this.offers = this._changeOffers(data.offers);
  }
  _changeOffers(offers) {
    offers = offers.map((el) => {
      const newEl = {};
      newEl.accepted = false;
      newEl.title = el.name;
      newEl.price = el.price;
      return newEl;
    });
    return offers;
  }
  static parseOffer(data) {
    return new ModelOffers(data);
  }

  static parseOffers(data) {
    return data.map(ModelOffers.parseOffer);
  }
}

export default ModelOffers;


