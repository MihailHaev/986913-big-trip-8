export default (imgies) => {
  imgies = imgies.map((el) => `<img src="${el}" alt="picture from place" class="point__destination-image">`);
  return `<div class="point__destination-images">
  ${imgies.join(``)}
</div>`;
};
