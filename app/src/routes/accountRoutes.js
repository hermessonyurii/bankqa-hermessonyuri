const router = require('express').Router();
const accountController = require('../controllers/accountController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/summary', accountController.getSummary);
router.post('/deposit', accountController.deposit);
router.post('/withdraw', accountController.withdraw);
router.post('/transfer', accountController.transfer);

module.exports = router;
