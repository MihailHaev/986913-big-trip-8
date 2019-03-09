import makeInfo from './info';
import makePoint from './point';

export default (length = false) => {
  if (!length) {
    return makePoint(makeInfo());
  } else {
    return new Array(length).fill().map(() => makePoint(makeInfo())).join(``);
  }
};
