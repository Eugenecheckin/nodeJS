const Router = require('express');

const { signUp, signIn, login, test, upload } = require('../controllers/auth');
const isOwner = require('../middleware/Owner');
const Storage = require('../middleware/Storage');
const authRouter = Router();

authRouter.post('/upload', Storage.single('avatar'), upload);
authRouter.get('/test', test);
authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.get('/login', isOwner, login);

module.exports = authRouter;
