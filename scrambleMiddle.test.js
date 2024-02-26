const { describe } = require('@jest/globals');
const { scrambleWord, scrambleMiddle, randomSort, WORD_MATCH_REGEX } = require('./scrambleMiddle');

describe('randomSort', () => {
  const a = 'a';
  const b = 'b';

  test('returns a number', () => {
    const result = randomSort(a, b);
    expect(typeof result).toBe('number');
  });

  test('returns -1, 0, or 1', () => {
    const result = randomSort(a, b);
    expect([-1, 0, 1]).toContain(result);
  });

  test('returns different results on multiple runs', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const sorted1 = [...arr].sort(randomSort);
    const sorted2 = [...arr].sort(randomSort);
    expect(sorted1).not.toEqual(sorted2);
  });

  test('returns an even distribution of results', () => {
    const counts = { '-1': 0, '0': 0, '1': 0 };
    for (let i = 0; i < 1000; i++) {
      const result = randomSort('a', 'b');
      counts[result]++;
    }

    // Variance of -2 gives an actual difference of 50, which is acceptable.
    expect(counts['-1']).toBeCloseTo(333, -2);
    expect(counts['0']).toBeCloseTo(333, -2);
    expect(counts['1']).toBeCloseTo(333, -2);
  });

});

describe('scrambleWord', () => {
  const word = 'abcdefghijklmnop';
  const first = word[0];
  const middle = word.slice(1, -1);
  const last = word[word.length - 1];

  test('input and output are same length', () => {
    const scrambled = scrambleWord(first, middle, last);
    expect(scrambled.length).toBe(word.length);
  });

  test('first and last letter remain the same', () => {
    const scrambled = scrambleWord(first, middle, last);
    expect(scrambled[0]).toBe(word[0]);
    expect(scrambled[scrambled.length - 1]).toBe(word[word.length - 1]);
  });

  test('output is not the same as input', () => {
    const scrambled = scrambleWord(first, middle, last);
    expect(scrambled).not.toBe(word);
  });
});


describe('scrambleMiddle', () => {
  const sentence = "Hello, John! Did you know that 2+2 equals 4? That's 100% correct. Also, don't forget our meeting at 5:30pm. Here's the address: 123 Main St., Apt #6B. See you there!";

  test('input and output are same length', () => {
    const scrambled = scrambleMiddle(sentence);
    expect(scrambled.length).toBe(sentence.length);
  });

  test('output is not the same as input', () => {
    const scrambled = scrambleMiddle(sentence);
    expect(scrambled).not.toBe(sentence);
  });
});

describe('WORD_MATCH_REGEX', () => {

  test('matches words of three or more characters', () => {
    const str = 'No not me!';
    const matches = str.match(WORD_MATCH_REGEX);
    expect(matches).toEqual(['not']);
  });

  test('does not match words of less than three characters', () => {
    const str = 'I am AI';
    const matches = str.match(WORD_MATCH_REGEX);
    expect(matches).toEqual(null);
  });

  test('ignores punctuation', () => {
    const str = 'Hello, John!';
    const matches = str.match(WORD_MATCH_REGEX);
    expect(matches).toEqual(['Hello', 'John']);
  });

  test('handles newlines as wordbreaks', () => {
    const str = 'Hello, John!\nDoes this work?\nYes!';
    const matches = str.match(WORD_MATCH_REGEX);
    expect(matches).toEqual(['Hello', 'John', 'Does', 'this', 'work', 'Yes']);
  });

  test('does not handle hyphens as wordbreaks', () => {
    const str = 'The word anti-theft is hyphenated.';
    const matches = str.match(WORD_MATCH_REGEX);
    expect(matches).toContain('anti-theft');
  });

});