const Router = require('express');

const { update, destroy, getList, create } = require('../controllers/user');
const isOwner = require('../middleware/Owner');
const isAdmin = require('../middleware/Admin');

const userRouter = Router();

userRouter.patch('/update', isOwner, update);
userRouter.delete('/delete', isOwner, destroy);
userRouter.post('/create', isAdmin, create);
userRouter.get('/getList', isAdmin, getList);



module.exports = userRouter;
