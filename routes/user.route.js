const Router = require('express');

const userController = require('../controllers/user.controller');

const userRouter = Router();
userRouter.patch('/update', userController.update);
userRouter.delete('/delete', userController.delete);

module.exports = userRouter;