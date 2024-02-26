/**
 * Sorts two elements randomly.
 * @param {any} a - The first element to compare.
 * @param {any} b - The second element to compare.
 * @returns {number} A negative, zero, or positive number indicating the order of the elements.
 */
const randomSort = (a, b) => Math.random() - 0.5;

/**
 * Scrambles the middle portion of a word.
 * 
 * @param {string} first - The first part of the word.
 * @param {string} middle - The middle part of the word to be scrambled.
 * @param {string} last - The last part of the word.
 * @returns {string} The word with the middle portion scrambled.
 */
const scrambleWord = (first, middle, last) => {
  const randomMiddle = middle.split('').sort(randomSort).join('');

  return `${first}${randomMiddle}${last}`;
}


/**
 * Scrambles the middle characters of a string.
 * @param {string} s - The input string.
 * @returns {string} - The string with the middle characters scrambled.
 */
const scrambleMiddle = (s) => {
  const regex = /(\w)(\w+)(\w)/g;

  return s.replace(regex, scrambleWord);
}

module.exports = {
  scrambleWord,
  scrambleMiddle
};