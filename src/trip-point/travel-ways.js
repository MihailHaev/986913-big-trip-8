export default (arrayOfWays, selectedIcon) => {
  const firstGroup = arrayOfWays.filter((el) => el.transport)
    .map((el) => {
      const lowName = el.name.toLowerCase();
      return `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${lowName}" name="travel-way" value="${lowName}" ${selectedIcon === el.icon ? `checked` : ``}>
      <label class="travel-way__select-label" for="travel-way-${lowName}">${el.icon} ${lowName}</label>`.trim();
    }).join(``);
  const secondGroup = arrayOfWays.filter((el) => !el.transport)
    .map((el) => {
      const lowName = el.name.toLowerCase();
      return `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${lowName}" name="travel-way" value="${lowName}" ${selectedIcon === el.icon ? `checked` : ``}>
      <label class="travel-way__select-label" for="travel-way-${lowName}">${el.icon} ${lowName}</label>`.trim();
    }).join(``);

  return `<div class="travel-way__select">
  <div class="travel-way__select-group">
        ${firstGroup}   
      </div>
      <div class="travel-way__select-group">
        ${secondGroup}    
      </div>
</div>`.trim();
};
