const WORD_MATCH_REGEX = /\b([\w-])([\w-]+)([\w-])\b/g;

/**
 * Sorts two elements randomly. The input is irrelevant.
 * @param {any} a - The first element to compare.
 * @param {any} b - The second element to compare.
 * @returns {number} A negative, zero, or positive number indicating the order of the elements.
 */
const randomSort = (a, b) => {
  const arr = [-1, 0, 1]; // The possible return values for a sort function.

  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Handles the regex match and returns the scrambled word.
 * Used to wrap the scrambleWord function in a regex replace.
 * @param {string} _ - The full matched string.
 * @param {string} first - The first part of the word.
 * @param {string} middle - The middle part of the word.
 * @param {string} last - The last part of the word.
 * @returns {string} The scrambled word.
 */
const handleRegexMatch = (_, first, middle, last) => scrambleWord(first, middle, last);

/**
 * Scrambles the middle portion of a word.
 * @param {string} _ - The regex match.
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
const scrambleMiddle = (input) => input.replace(WORD_MATCH_REGEX, handleRegexMatch);

module.exports = {
  WORD_MATCH_REGEX,
  randomSort,
  scrambleWord,
  scrambleMiddle
};