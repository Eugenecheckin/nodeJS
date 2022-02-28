const Router = require('express');

const {
  create,
  load,
  loadAll,
  loadAutors,
  loadGanres,
  price,
  loadCart,
  addToCart,
  removeToCart,
  addComment,
  loadComment,
  addRating,
  loadRating,
} = require('../controllers/book');
const isAdmin = require('../middleware/Admin');
const isOwner = require('../middleware/Owner');
const Storage = require('../middleware/Storage');

const bookRouter = Router();

bookRouter.post('/create', isAdmin, Storage, create);
bookRouter.post('/load', load);
bookRouter.get('/loadall', loadAll);
bookRouter.get('/loadautors', loadAutors);
bookRouter.get('/loadganres', loadGanres);
bookRouter.get('/price', price);
bookRouter.post('/loadcart', isOwner, loadCart);
bookRouter.post('/addtocart', isOwner, addToCart);
bookRouter.post('/removetocart', isOwner, removeToCart);
bookRouter.post('/addcomment', isOwner, addComment);
bookRouter.post('/loadcomment', loadComment);
bookRouter.post('/addrating', isOwner, addRating);
bookRouter.post('/loadrating', loadRating);

module.exports = bookRouter;
