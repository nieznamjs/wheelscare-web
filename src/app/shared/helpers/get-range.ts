export const getRange = (a: number, b: number): number[] => {
  const array = [];

  for (let i = a; i <= b; i++) {
    array.push(i);
  }

  return array;
};
