const accountNumberElement = document.querySelector('[data-cy="account-number"]');
const accountBalanceElement = document.querySelector('[data-cy="account-balance"]');
const statementTableBody = document.querySelector('[data-cy="statement-table-body"]');
const dashboardFeedback = document.getElementById('feedback');

async function loadSummary() {
  try {
    const response = await window.BankQAApi.apiRequest('/api/account/summary');
    const { account, statement } = response.data;

    accountNumberElement.textContent = account.account_number;
    accountBalanceElement.textContent = Number(account.balance).toFixed(2);

    statementTableBody.innerHTML = '';

    statement.forEach((item) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.transaction_type}</td>
        <td>R$ ${Number(item.amount).toFixed(2)}</td>
        <td>${item.reference_account_number || '-'}</td>
        <td>${item.description || '-'}</td>
      `;
      statementTableBody.appendChild(tr);
    });
  } catch (error) {
    dashboardFeedback.textContent = error.message;
  }
}

document.getElementById('refresh-button')?.addEventListener('click', loadSummary);

document.getElementById('logout-button')?.addEventListener('click', () => {
  localStorage.removeItem('bankqaToken');
  localStorage.removeItem('bankqaAccountNumber');
  window.location.href = '/login';
});

document.getElementById('deposit-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await window.BankQAApi.apiRequest('/api/account/deposit', {
      method: 'POST',
      body: JSON.stringify({
        amount: formData.get('amount'),
        description: 'Deposit created from dashboard'
      })
    });

    dashboardFeedback.textContent = response.message;
    form.reset();
    await loadSummary();
  } catch (error) {
    dashboardFeedback.textContent = error.message;
  }
});

document.getElementById('withdraw-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await window.BankQAApi.apiRequest('/api/account/withdraw', {
      method: 'POST',
      body: JSON.stringify({
        amount: formData.get('amount'),
        description: 'Withdraw created from dashboard'
      })
    });

    dashboardFeedback.textContent = response.message;
    form.reset();
    await loadSummary();
  } catch (error) {
    dashboardFeedback.textContent = error.message;
  }
});

document.getElementById('transfer-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await window.BankQAApi.apiRequest('/api/account/transfer', {
      method: 'POST',
      body: JSON.stringify({
        destinationAccountNumber: formData.get('destinationAccountNumber'),
        amount: formData.get('amount'),
        description: 'Transfer created from dashboard'
      })
    });

    dashboardFeedback.textContent = response.message;
    form.reset();
    await loadSummary();
  } catch (error) {
    dashboardFeedback.textContent = error.message;
  }
});

loadSummary();
