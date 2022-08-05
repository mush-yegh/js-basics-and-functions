/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
  var d = new Date(date);
  d.setMinutes(d.getMinutes() + Math.abs(d.getTimezoneOffset()));

  return {
    date: d,
    value: d.toISOString().slice(0, 16).replace("T", " "),
    add: function (amount, unit) {
      validate(amount, unit);
      return changeTime(amount, unit, this, OPERATIONS[0]);
    },
    subtract: function (amount, unit) {
      validate(amount, unit);
      return changeTime(amount, unit, this, OPERATIONS[1]);
    },
  };
};

const UNITS = ["years", "months", "days", "hours", "minutes"];
const OPERATIONS = ["ADD", "SUBTRACT"];

function validate(amount, unit) {
  if (amount < 0 || !UNITS.includes(unit)) {
    throw new TypeError("Ooops, invalid amount/unit");
  }
}

function changeTime(amount, unit, self, operation) {
  const amountWithSign = operation === "ADD" ? amount : -amount;
  const date = new Date(self.date);
  switch (unit) {
    case UNITS[0]:
      self.date = date.setFullYear(date.getFullYear() + amountWithSign);
      self.value = date.toISOString().slice(0, 16).replace("T", " ");
      break;
    case UNITS[1]:
      self.date = date.setMonth(date.getMonth() + amountWithSign);
      self.value = date.toISOString().slice(0, 16).replace("T", " ");
      break;
    case UNITS[2]:
      self.date = date.setDate(date.getDate() + amountWithSign);
      self.value = date.toISOString().slice(0, 16).replace("T", " ");
      break;
    case UNITS[3]:
      self.date = date.setHours(date.getHours() + amountWithSign);
      self.value = date.toISOString().slice(0, 16).replace("T", " ");
      break;
    case UNITS[4]:
      self.date = date.setMinutes(date.getMinutes() + amountWithSign);
      self.value = date.toISOString().slice(0, 16).replace("T", " ");
      break;
  }
  return self;
}
