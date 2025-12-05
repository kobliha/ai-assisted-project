// Import the function to be tested
const add = require('../js/app');

describe('add function', () => {
  test('should correctly add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('should correctly add a positive and a negative number', () => {
    expect(add(5, -2)).toBe(3);
  });
});
