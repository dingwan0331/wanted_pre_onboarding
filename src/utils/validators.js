const { CreateError } = require("./exceptions");

const validateInt = (data) => {
  const keys = Object.keys(data);

  keys.forEach((element) => {
    if (data[element] <= 0 || data[element] % 1) {
      throw new CreateError(400, `Invalid ${element}`);
    }
    if (isNaN(+data[element])) {
      throw new CreateError(400, `Invalid ${element}`);
    }
  });
  return;
};

module.exports = { validateInt };
