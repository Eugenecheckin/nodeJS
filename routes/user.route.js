const Router = require('express');

const userController = require('../controllers/user.controller');
const Auth = require('../middleware/auth');

const userRouter = Router();
userRouter.patch('/update', Auth, userController.update);
userRouter.delete('/delete', Auth, userController.delete);

module.exports = userRouter;