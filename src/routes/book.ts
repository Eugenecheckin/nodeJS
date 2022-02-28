const Router = require('express');

import {
  create,
  load,
  loadall,
  loadautors,
  loadganres,
  price,
  loadcart,
  addtocart,
  removeToCart,
  addcomment,
  loadcomment,
  addRating,
  loadRating,
} from '../controllers/book';
const isAdmin = require('../middleware/Admin');
import isOwner from '../middleware/Owner';
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
bookRouter.post('/removetocart', isOwner, removeToCart);
bookRouter.post('/addcomment', isOwner, addcomment);
bookRouter.post('/loadcomment', loadcomment);
bookRouter.post('/addrating', isOwner, addRating);
bookRouter.post('/loadrating', loadRating);

export default bookRouter;
