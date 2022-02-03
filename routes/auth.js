const Router = require('express');

const { signUp, signIn, login, test } = require('../controllers/auth');
const isOwner = require('../middleware/Owner');

const authRouter = Router();

authRouter.get('/test', test);
authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.get('/login', isOwner, login);

module.exports = authRouter;
