describe('Negative Transaction Flows', () => {
  it('should not allow withdraw when balance is insufficient', () => {
    cy.loginByApiAndVisitDashboard();
    cy.get('[data-cy="withdraw-amount"]').type('10000'); // Valor maior que saldo
    cy.get('[data-cy="withdraw-submit"]').click();
    cy.get('[data-cy="dashboard-feedback"]').should('contain', 'Insufficient balance');
  });

  it('should not allow transfer to non-existent account', () => {
    cy.loginByApiAndVisitDashboard();
    cy.get('[data-cy="transfer-account"]').type('999999999999');
    cy.get('[data-cy="transfer-amount"]').type('10');
    cy.get('[data-cy="transfer-submit"]').click();
    cy.get('[data-cy="dashboard-feedback"]').should('contain', 'Destination account not found');
  });

  it('should not allow negative amount in deposit', () => {
    cy.loginByApiAndVisitDashboard();
    cy.get('[data-cy="deposit-amount"]').type('-100');
    cy.get('[data-cy="deposit-submit"]').click();
    cy.get('[data-cy="dashboard-feedback"]').should('contain', 'Amount must be greater than zero');
  });
});