export default (inner) => {
  const elem = document.createElement(`div`);
  elem.innerHTML = inner;
  return elem;
};
