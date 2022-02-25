const Router = require('express');

const {
  create,
  load,
  loadall,
  loadautors,
  loadganres,
  price,
  loadcart,
  addtocart,
  addcomment,
  loadcomment,
} = require('../controllers/book');
const isAdmin = require('../middleware/Admin');
const isOwner = require('../middleware/Owner');
const Storage = require('../middleware/Storage');

const bookRouter = Router();

bookRouter.post('/create', isAdmin, Storage, create);
bookRouter.post('/load', load);
bookRouter.get('/loadall', loadall);
bookRouter.get('/loadautors', loadautors);
bookRouter.get('/loadganres', loadganres);
bookRouter.get('/price', price);
bookRouter.post('/loadcart', isOwner, loadcart);
bookRouter.post('/addtocart', isOwner, addtocart);
bookRouter.post('/addcomment', isOwner, addcomment);
bookRouter.post('/loadcomment', loadcomment);



module.exports = bookRouter;
