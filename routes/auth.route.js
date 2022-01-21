const Router = require('express');

const authController = require('../controllers/auth.controller');

const authRouter = Router();
authRouter.post('/signup', authController.sinUp);
authRouter.get('/login', authController.login);

module.exports = authRouter;