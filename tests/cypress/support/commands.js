Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request('POST', `${Cypress.env('apiUrl')}/auth/login`, {
    email,
    password
  });
});

Cypress.Commands.add('loginByApiAndVisitDashboard', () => {
  return cy.apiLogin(Cypress.env('userEmail'), Cypress.env('userPassword')).then((response) => {
    return cy.visit('/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('bankqaToken', response.body.data.token);
        win.localStorage.setItem('bankqaAccountNumber', response.body.data.account.account_number);
      }
    });
  });
});

Cypress.Commands.add('createUniqueUser', () => {
  const timestamp = Date.now();
  const uniqueUser = {
    fullName: `Hermesson Yuri QA ${timestamp}`,
    email: `hermesson.${timestamp}@example.com`,
    documentNumber: `${timestamp}`.slice(-11),
    password: 'Password123!'
  };

  return cy.wrap(uniqueUser);
});
