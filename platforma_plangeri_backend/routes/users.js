const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/me', ensureAuthenticated, userController.getUserInfo);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/usedCities', userController.getUsedCities);

module.exports = router;
