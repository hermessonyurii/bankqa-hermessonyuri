const axios = require('axios');

async function testAPI() {
  const baseUrl = 'http://localhost:3000/api';
  const timestamp = Date.now();
  const uniqueDoc = `${timestamp}`.slice(-11);

  try {
    console.log('Testing API health...');
    const healthResponse = await axios.get(`${baseUrl}/health`);
    console.log('✅ Health check passed:', healthResponse.data);

    console.log('Testing user registration...');
    const registerResponse = await axios.post(`${baseUrl}/auth/register`, {
      fullName: `Test User ${timestamp}`,
      email: `test${timestamp}@example.com`,
      documentNumber: uniqueDoc,
      password: 'Password123!'
    });
    console.log('✅ Registration passed:', registerResponse.data);

    console.log('Testing login...');
    const loginResponse = await axios.post(`${baseUrl}/auth/login`, {
      email: `test${timestamp}@example.com`,
      password: 'Password123!'
    });
    console.log('✅ Login passed:', loginResponse.data);

    const token = loginResponse.data.data.token;

    console.log('Testing account summary...');
    const accountResponse = await axios.get(`${baseUrl}/account/summary`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Account summary passed:', accountResponse.data);

    console.log('All API tests passed! 🎉');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

testAPI();