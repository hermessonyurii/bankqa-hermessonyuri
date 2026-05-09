describe('User Login', () => {
  it('should log in successfully and redirect to dashboard', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-email"]').type(Cypress.env('userEmail'));
    cy.get('[data-cy="login-password"]').type(Cypress.env('userPassword'));
    cy.get('[data-cy="login-submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="account-number"]').should('not.have.text', '-');
  });
});
