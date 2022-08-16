isPositiveInt = (value) => {
  let result = true;
  if (isNaN(+value)) {
    result = false;
    return;
  }
  if (value <= 0 || value % 1) {
    result = false;
    return;
  }
  return result;
};

module.exports = { isPositiveInt };
