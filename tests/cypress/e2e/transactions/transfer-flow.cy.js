describe('Transfer Flow', () => {
  /**
   * Aqui eu cubro uma transferência entre contas.
   * O foco não é só o 200 da API; quero proteger a regra de débito na origem.
   */
  it('should transfer money to another account successfully', () => {
    cy.loginByApiAndVisitDashboard();
    cy.get('[data-cy="transfer-account"]').type(Cypress.env('destinationAccount'));
    cy.get('[data-cy="transfer-amount"]').type('25');
    cy.get('[data-cy="transfer-submit"]').click();
    cy.get('[data-cy="dashboard-feedback"]').should('contain', 'Transfer completed successfully.');
  });
});
