import {
  signUp, signIn, login, test, upload,
} from '../controllers/auth';

import Router = require('express');

import isOwner from '../middleware/Owner';
const Storage = require('../middleware/Storage');

const authRouter = Router();

authRouter.post('/upload', isOwner, Storage, upload);
authRouter.get('/test', test);
authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/login', isOwner, login);

export default authRouter;