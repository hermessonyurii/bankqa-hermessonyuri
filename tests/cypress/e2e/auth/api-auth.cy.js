describe('API Auth Tests', () => {
  it('should register a new user via API', () => {
    cy.createUniqueUser().then((user) => {
      cy.request('POST', `${Cypress.env('apiUrl')}/auth/register`, user).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('User registered successfully.');
      });
    });
  });

  it('should login via API', () => {
    cy.request('POST', `${Cypress.env('apiUrl')}/auth/login`, {
      email: Cypress.env('userEmail'),
      password: Cypress.env('userPassword')
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('token');
    });
  });

  it('should reject invalid login', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/auth/login`,
      body: { email: 'invalid@example.com', password: 'wrong' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});