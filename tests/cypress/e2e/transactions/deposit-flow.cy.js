describe('Deposit Flow', () => {
  /**
   * Neste cenário eu valido um crédito simples.
   * A intenção é garantir que o saldo mude e o fluxo principal do dashboard fique íntegro.
   */
  it('should complete a deposit and update the balance', () => {
    cy.loginByApiAndVisitDashboard();
    cy.get('[data-cy="account-balance"]').invoke('text').then((beforeBalanceText) => {
      const beforeBalance = Number(beforeBalanceText);
      cy.get('[data-cy="deposit-amount"]').type('100');
      cy.get('[data-cy="deposit-submit"]').click();
      cy.get('[data-cy="dashboard-feedback"]').should('contain', 'Deposit completed successfully.');
      cy.get('[data-cy="account-balance"]').should(($balance) => {
        const currentBalance = Number($balance.text());
        expect(currentBalance).to.be.greaterThan(beforeBalance);
      });
    });
  });
});
