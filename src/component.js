import createNewElement from './element';

class Component {
  constructor() {
    if (new.target === `Component`) {
      throw new Error(`This is abstract`);
    }
    this._element = null;
    this._container = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`Nothing in template`);
  }
  render(container) {
    this._element = createNewElement(this.template);
    this._container = container;
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
    this._container = null;
  }

  bind() {

  }

  unbind() {

  }

  _partialUpdate() {
    this.unbind();
    const prevElement = this._element;
    this._element = createNewElement(this.template);
    this._container.replaceChild(this._element, prevElement);
    prevElement.remove();
    this.bind();
  }
}

export default Component;
