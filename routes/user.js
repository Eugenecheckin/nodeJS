const Router = require('express');

const { update, destroy } = require('../controllers/user');
const isAuth = require('../middleware/auth');

const userRouter = Router();

userRouter.patch('/update', isAuth, update);
userRouter.delete('/delete', isAuth, destroy);

module.exports = userRouter;