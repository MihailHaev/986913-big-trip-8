export default (types, cities, selectedType, city) => {
  let options = types.filter((el) => !el.transport)
    .map((el) => el.name.toLowerCase());
  for (let cityOfSet of cities) {
    options.push(cityOfSet);
  }

  let selectedOption;
  if (selectedType.transport) {
    selectedOption = city;
  } else {
    selectedOption = selectedType.name.toLowerCase();
  }

  options = options.map((el) => `<option value="${el}"></option>`);

  const labelText = selectedType.transport ? `${selectedType.name} to` : `Check into`;

  return `<div class="point__destination-wrap">
  <label class="point__destination-label" for="destination">${labelText}</label>
  <input class="point__destination-input" list="destination-select" id="destination" value="${selectedOption}" name="destination">
  <datalist id="destination-select">
    ${options}
  </datalist>
</div>`;
};
