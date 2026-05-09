describe('Withdraw Flow', () => {
  it('should complete a withdraw when the account has enough balance', () => {
    cy.loginByApiAndVisitDashboard();
    cy.get('[data-cy="withdraw-amount"]').type('50');
    cy.get('[data-cy="withdraw-submit"]').click();
    cy.get('[data-cy="dashboard-feedback"]').should('contain', 'Withdraw completed successfully.');
  });
});
