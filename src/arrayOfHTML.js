export default (length, resFunc) => {
  return new Array(length).fill().map(() => resFunc);
};

