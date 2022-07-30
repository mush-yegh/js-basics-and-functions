/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
  const hashTagsArray = tweet.split(" ");
  return hashTagsArray.filter((e) => e.startsWith("#")).map((e) => e.slice(1));
};
