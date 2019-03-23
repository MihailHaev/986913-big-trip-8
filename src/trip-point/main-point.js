import Component from '../component';
import moment from 'moment';

class MainPoint extends Component {
  constructor() {
    super();
  }

  _getHoursAndMinutes(time) {
    return moment(time).format(`HH:mm`);
  }

  _getTimeTable() {
    const durationObj = moment.duration(this._time.timeOfEnd - this._time.timeOfStart);
    if (durationObj.minutes() === 0 && durationObj.hours() === 0) {
      return this._getHoursAndMinutes(this._time.timeOfStart);
    } else {
      return `${this._getHoursAndMinutes(this._time.timeOfStart)}&nbsp;&mdash; ${this._getHoursAndMinutes(this._time.timeOfEnd)}`;
    }

  }

  _getDuration() {
    const durationObj = moment.duration(this._time.timeOfEnd - this._time.timeOfStart);
    if (durationObj.minutes() === 0 && durationObj.hours() === 0) {
      return ``;
    } else {
      const hours = durationObj.hours();
      const minutes = durationObj.minutes();
      if (hours === 0) {
        return `${minutes}M`;
      } else if (minutes === 0) {
        return `${hours}H`;
      }
      return `${hours}H ${minutes}M`;
    }
  }
}

export default MainPoint;
