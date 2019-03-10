import {getRandomInt, getRandomBoolean, getRandomElementOfArray, getRandomDate, getRandomElementOfObject} from '../random-values';

const types = [{icon: `🏨`, name: `Hotel`, transport: false},
  {icon: `🚗`, name: `Drive`, transport: true},
  {icon: `🚌`, name: `Bus`, transport: true},
  {icon: `🚂`, name: `Train`, transport: true},
  {icon: `🛳️`, name: `Ship`, transport: true},
  {icon: `🚊`, name: `Transport`, transport: true},
  {icon: `🏛️`, name: `Sightseeing`, transport: false},
  {icon: `🍴`, name: `Restaurant`, transport: false},
  {icon: `🚕`, name: `Taxi`, transport: true},
  {icon: `✈️`, name: `Flight`, transport: true}];
const arrayOfDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `);

const offers = {'Add luggage': getRandomInt(10, 40), 'Switch to comfort class': getRandomInt(10, 40), 'Add meal': getRandomInt(10, 40), 'Choose seats': getRandomInt(10, 40)};
const cities = [`Moscow`, `Amsterdam`, `Geneva`, `Chamonix`, `Aldento`, `Paris`, `London`, `Milan`];

const getHoursAndMinutes = (time) => time.toLocaleString(`ru`, {
  year: `numeric`,
  month: `long`,
  day: `numeric`,
  weekday: `long`,
  timezone: `UTC`,
  hour: `numeric`,
  minute: `numeric`
}).split(` `)[5];

const makeHoursAndMinutes = (ms) => {
  const hoursAndMinutes = [];
  const hours = Math.floor(ms / (3600 * 1000));
  if (hours > 0) {
    hoursAndMinutes.push(`${hours}H`);
    ms -= (hours * 3600 * 1000);
  }
  hoursAndMinutes.push(`${Math.ceil(ms / (60 * 1000))}M`);
  return hoursAndMinutes.join(` `);
};

export default () => {
  const time = getRandomDate((4 / 24), (1 / 24));
  const duration = getRandomInt((1000 * 60), (1000 * 60 * 60 * 3));
  const timeOfEnd = time + duration;
  const allTime = {
    timeOfStart: getHoursAndMinutes(new Date(time)),
    timeOfEnd: getHoursAndMinutes(new Date(timeOfEnd)),
    duration: makeHoursAndMinutes(duration),
  };
  return {
    type: getRandomElementOfArray(types),
    city: getRandomElementOfArray(cities),
    desc: getRandomElementOfArray(arrayOfDesc, getRandomInt(1, 3)).join(`. `),
    time: allTime,
<<<<<<< HEAD
    imeges: `http://picsum.photos/300/150?r=${Math.random()}`,
=======
    imges: `http://picsum.photos/300/150?r=${Math.random()}`,
>>>>>>> a28a0b58c4099e6d457bd9831037a840a963d20c
    price: getRandomInt(10, 100),
    offers: getRandomElementOfObject(offers, getRandomInt(0, 2)),
    isFavorit: getRandomBoolean(),
  };
};
