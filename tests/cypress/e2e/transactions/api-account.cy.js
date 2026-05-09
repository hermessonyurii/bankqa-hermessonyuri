describe('API Account Tests', () => {
  let token;

  before(() => {
    cy.apiLogin(Cypress.env('userEmail'), Cypress.env('userPassword')).then((response) => {
      token = response.body.data.token;
    });
  });

  it('should get account summary with token', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/account/summary`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('account');
      expect(response.body.data).to.have.property('statement');
    });
  });

  it('should reject account summary without token', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/account/summary`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('should deposit via API', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/account/deposit`,
      headers: { Authorization: `Bearer ${token}` },
      body: { amount: 50, description: 'API Deposit' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Deposit completed successfully.');
    });
  });
});