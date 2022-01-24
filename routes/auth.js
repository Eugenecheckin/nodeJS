const Router = require('express');

const { sinUp, login } = require('../controllers/auth');
const isAuth = require('../middleware/auth');

const authRouter = Router();
authRouter.post('/signup', sinUp);
authRouter.get('/login', isAuth, login);

module.exports = authRouter;