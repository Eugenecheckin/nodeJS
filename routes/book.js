const Router = require('express');

const { create, load } = require('../controllers/book');
const isAdmin = require('../middleware/Admin');
const Storage = require('../middleware/Storage');

const bookRouter = Router();

bookRouter.post('/create', isAdmin, Storage, create);
bookRouter.get('/load', load);

module.exports = bookRouter;
