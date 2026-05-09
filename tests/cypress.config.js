const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    env: {
      apiUrl: process.env.CYPRESS_API_URL || 'http://localhost:3000/api',
      userEmail: process.env.CYPRESS_USER_EMAIL || 'hermesson.yuri.qa@example.com',
      userPassword: process.env.CYPRESS_USER_PASSWORD || 'Password123!',
      destinationAccount: process.env.CYPRESS_DESTINATION_ACCOUNT || '260000000222'
    },
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    retries: {
      runMode: 1,
      openMode: 0
    }
  },
  // Force cmd.exe on Windows to avoid PowerShell issues
  execTimeout: 60000,
  taskTimeout: 60000,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000
});
