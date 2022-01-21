const Router = require('express');

const userController = require('../controllers/user');
const isAuth = require('../middleware/auth');

const userRouter = Router();
userRouter.patch('/update', isAuth, userController.update);
userRouter.delete('/delete', isAuth, userController.delete);

module.exports = userRouter;