const type = `- Taxi — 🚕
- Bus — 🚌
- Train — 🚂
- Ship — 🛳️
- Transport — 🚊
- Drive — 🚗
- Flight — ✈️
- Check-in - 🏨
- Sightseeing — 🏛️
- Restaurant — `;
const arrayOfText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `);
console.log(arrayOfText);

export default () => ({
  text: `array`,
  time: [`timetable`, `duration`],
  price: 20,
  offers: `object`,
});
