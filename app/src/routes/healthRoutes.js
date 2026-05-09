const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/', authController.health);

module.exports = router;
