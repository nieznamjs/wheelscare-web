import { getRange } from '@helpers';

describe('getRange', () => {
  test('getRange should return proper arrays', () => {
    expect(getRange(1, 5)).toEqual([ 1, 2, 3, 4, 5 ]);
    expect(getRange(-1, 3)).toEqual([ -1, 0, 1, 2, 3 ]);
    expect(getRange(1, 1)).toEqual([ 1 ]);
  });

  test('getRange should return empty array if first argument is greater than second', () => {
    expect(getRange(2, 1)).toEqual([]);
  });
});
