const Router = require('express');

const {
  create,
  load,
  loadall,
  loadautors,
  loadganres,
  price,
} = require('../controllers/book');
const isAdmin = require('../middleware/Admin');
const Storage = require('../middleware/Storage');

const bookRouter = Router();

bookRouter.post('/create', isAdmin, Storage, create);
bookRouter.post('/load', load);
bookRouter.get('/loadall', loadall);
bookRouter.get('/loadautors', loadautors);
bookRouter.get('/loadganres', loadganres);
bookRouter.get('/price', price);

module.exports = bookRouter;
