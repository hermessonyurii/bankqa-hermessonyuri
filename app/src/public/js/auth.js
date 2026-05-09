const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const feedbackElement = document.getElementById('feedback');

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);

    try {
      const response = await window.BankQAApi.apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName: formData.get('fullName'),
          email: formData.get('email'),
          documentNumber: formData.get('documentNumber'),
          password: formData.get('password')
        })
      });

      feedbackElement.textContent = `${response.message} Conta ${response.data.account.account_number} criada.`;
      registerForm.reset();
    } catch (error) {
      feedbackElement.textContent = error.message;
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);

    try {
      const response = await window.BankQAApi.apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password')
        })
      });

      localStorage.setItem('bankqaToken', response.data.token);
      localStorage.setItem('bankqaAccountNumber', response.data.account.account_number);
      window.location.href = '/dashboard';
    } catch (error) {
      feedbackElement.textContent = error.message;
    }
  });
}
