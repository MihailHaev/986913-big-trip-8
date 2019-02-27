export default (text, isChecked = false) => {
  text = text.toLowerCase();
  return `<input
    type="radio"
    id="filter-${text}"
    name="filter"
    value="${text}"
    ${isChecked ? `checked` : ``}>
  <label
    class="trip-filter__item"
    for="filter-${text}">${text}</label>`;
};
