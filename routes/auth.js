const Router = require('express');

const authController = require('../controllers/auth');
const Auth = require('../middleware/auth');

const authRouter = Router();
authRouter.post('/signup', authController.sinUp);
authRouter.get('/login', Auth, authController.login);

module.exports = authRouter;