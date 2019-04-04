class ModelPoint {
  constructor(data) {
    this._types = [{icon: `🏨`, name: `Check-in`, transport: false},
      {icon: `🚗`, name: `Drive`, transport: true},
      {icon: `🚌`, name: `Bus`, transport: true},
      {icon: `🚂`, name: `Train`, transport: true},
      {icon: `🛳️`, name: `Ship`, transport: true},
      {icon: `🚊`, name: `Transport`, transport: true},
      {icon: `🏛️`, name: `Sightseeing`, transport: false, title: ``},
      {icon: `🍴`, name: `Restaurant`, transport: false},
      {icon: `🚕`, name: `Taxi`, transport: true},
      {icon: `✈️`, name: `Flight`, transport: true}];

    this.id = data.id;
    this.type = this._findType(data.type);
    this.timeOfStart = new Date(data[`date_from`]);
    this.timeOfEnd = new Date(data[`date_to`]);
    this.price = data[`base_price`];
    this.offers = data.offers;
    this.destination = data.destination;
    this.isFavorit = data[`is_favorite`];
  }

  _findType(dataType) {
    for (let type of this._types) {
      if (type.name.toLocaleLowerCase() === dataType) {
        return type;
      }
    }
    return dataType;
  }

  _findTypeReverse() {
    return this.type.name.toLocaleLowerCase();
  }
  toRAW() {
    return {
      'id': this._id,
      'type': this._findTypeReverse(this._type),
      'date_from': this._timeOfStart,
      'date_to': this._timeOfEnd,
      'base_price': this._price,
      'offers': this._offers,
      'destination': this._destination,
      'is_favorite': this._isFavorit
    };
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}

export default ModelPoint;
