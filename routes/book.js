const Router = require('express');

const {
  /* update, destroy, getList, */ create /* , upload */,
} = require('../controllers/book');
const isAdmin = require('../middleware/Admin');
const Storage = require('../middleware/Storage');

const bookRouter = Router();

bookRouter.post('/create', isAdmin, Storage, create);
//bookRouter.post('/upload', isAdmin, Storage, upload);
//bookRouter.patch('/update', isAdmin, update);
//bookRouter.delete('/delete', isAdmin, destroy);
//bookRouter.get('/getList', isAdmin, getList);

module.exports = bookRouter;
