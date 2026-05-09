describe('User Registration', () => {
  it('should register a new user successfully from the UI', () => {
    cy.createUniqueUser().then((user) => {
      cy.visit('/register');
      cy.get('[data-cy="register-full-name"]').type(user.fullName);
      cy.get('[data-cy="register-email"]').type(user.email);
      cy.get('[data-cy="register-document"]').type(user.documentNumber);
      cy.get('[data-cy="register-password"]').type(user.password);
      cy.get('[data-cy="register-submit"]').click();

      cy.get('[data-cy="register-feedback"]')
        .should('contain', 'User registered successfully.')
        .and('contain', 'Conta');
    });
  });
});
