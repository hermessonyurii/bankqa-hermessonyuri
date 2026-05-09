const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/register.html'));
});

router.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/dashboard.html'));
});

module.exports = router;
