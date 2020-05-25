import { getRange } from '@helpers';

describe('getRange', () => {
  test('getRange should return proper arrays', () => {
    expect(getRange(1, 5)).toEqual([ 1, 2, 3, 4, 5 ]);
    expect(getRange(-1, 3)).toEqual([ -1, 0, 1, 2, 3 ]);
  });

  test('getRange should return empty array if first argument is greater then second', () => {
    expect(getRange(2, 1)).toEqual([]);
  });
});
