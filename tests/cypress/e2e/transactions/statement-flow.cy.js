describe('Statement Flow', () => {
  it('should load the statement with transaction rows', () => {
    cy.loginByApiAndVisitDashboard();
    cy.get('[data-cy="refresh-summary"]').click();
    cy.get('[data-cy="statement-table-body"] tr').its('length').should('be.gte', 1);
  });
});
