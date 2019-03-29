export default (evt) => {
  evt.preventDefault();
  document.querySelector(`#stats`).classList.add(`visually-hidden`);
  document.querySelector(`a[href="#stats"]`).classList.remove(`view-switch__item--active`);

  document.querySelector(`#table`).classList.remove(`visually-hidden`);
  document.querySelector(`a[href="#table"]`).classList.add(`view-switch__item--active`);
};
