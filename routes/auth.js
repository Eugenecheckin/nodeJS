const Router = require('express');

const authController = require('../controllers/auth');
const isAuth = require('../middleware/auth');

const authRouter = Router();
authRouter.post('/signup', authController.sinUp);
authRouter.get('/login', isAuth, authController.login);

module.exports = authRouter;