export {};

describe('My first Test', () => {
  it('First Test', () => {
    cy.visit('/');

    cy.get('#email').type('LoQeN00@o2.pl');
    cy.get('button[type=submit]').click();
  });
});
