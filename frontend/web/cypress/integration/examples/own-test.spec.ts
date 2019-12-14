/// <reference types="Cypress" />

describe('Test cypress', () => {
  it('should run', () => {
    const sum = 2 + 2;

    expect(sum).to.equal(4);
  });
});
