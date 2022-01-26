const Router = require('express');

const { sinUp, login } = require('../controllers/auth');
const isOwner = require('../middleware/Owner');

const authRouter = Router();

authRouter.post('/signup', sinUp);
authRouter.get('/login', isOwner, login);

module.exports = authRouter;
