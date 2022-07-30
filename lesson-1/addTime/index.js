/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
  const correctInterval = calculateCorrectInterval(interval);

  const minutesInInterval = interval < 60 ? interval : interval % 60;

  const minutesSum = minutes + minutesInInterval;

  const finalMinutes = minutesSum < 60 ? minutesSum : minutesSum % 60;

  const hoursInInterval = interval < 60 ? 0 : parseInt(interval / 60);

  const hoursSum =
    minutesSum < 60 ? hours + hoursInInterval : hours + hoursInInterval + 1;

  const correctedHours = hoursSum > 23 ? hoursSum % 24 : hoursSum;

  return formatTime(correctedHours) + ":" + formatTime(finalMinutes);
};

const MINUTES_IN_A_DAY = 60 * 24;

function calculateCorrectInterval(interval) {
  if (interval >= MINUTES_IN_A_DAY) {
    return subtractDay(interval);
  }
  return interval;
}

function subtractDay(minutes) {
  if (minutes < MINUTES_IN_A_DAY) {
    return minutes;
  }
  return subtractDay(minutes % MINUTES_IN_A_DAY);
}

function formatTime(minutes) {
  let result = minutes;
  if (minutes < 10) {
    result = "0" + minutes;
  }
  return result;
}
