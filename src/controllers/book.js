const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const db = require('../../models');

const create = async (request, response) => {
  const {
    title, autor, year, genre, price,
  } = request.body;
  const { fileName } = request.headers;
  const isCreated = await db.book.findAll({ where: { title } });
  if (isCreated.length > 0) {
    return response.status(400).json({ message: 'книга уже добавлена' });
  }
  try {
    const createdBook = await db.book.create({
      title,
      autor,
      year,
      genre,
      cover: fileName,
      price,
    });

    return response.status(200).json(createdBook);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка добавленния книги',
      err: err.message,
    });
  }
};

const load = async (request, response) => {
  try {
    const { offset } = request.headers;
    const term = request.body;

    if (Object.keys(term).length > 0) {
      const findOption = {
        where: {},
        raw: true,
        offset,
        limit: 10,
      };
      Object.keys(term).forEach((i) => {
        console.log(term[i]);
        if (i === 'price') {
          findOption.where[i] = { [Op.between]: term[i].split('-') };
        } else {
          findOption.where[i] = term[i].split('-');// term[i].map((n) => n.replace('-', ' '));
        }
      });
      console.log(findOption.where);
      const loadBooks = await db.book.findAndCountAll(findOption);
      return response.status(200).json(loadBooks);
    }
    const loadBooks = await db.book.findAndCountAll({
      // raw: true,
      offset,
      limit: 10,
    });
    /* const gen = await db.book.findOne({ where: { id: '11' } });
    console.log(gen);

    const gen1 = await gen.getGenname();
    console.log(gen1); */

    /* const signInUser = await db.User.findOne({ where: { email:'evgeniyit@mail.ru' } });
    await loadBooks.rows[1].addUsers(signInUser);
    console.log(await signInUser.getBooks()); */
    return response.status(200).json(loadBooks);
  } catch (err) {
    return response.status(404).json({ message: err.message });
  }
};

const loadall = async (request, response) => {
  try {
    const loadBook = await db.book.findAll({
      raw: true,
    });

    return response.status(200).json(loadBook);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

const loadcart = async (request, response) => {
  try {
    const { email } = request.headers;    
    const owner = await db.User.findOne({ where: { email } });
    return response.status(200).json(await owner.getBooks());    
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

const addtocart = async (request, response) => {
  try {
    const { email, bookid } = request.headers;
    const owner = await db.User.findOne({ where: { email } });
    const book = await db.book.findOne({ where: { id: bookid } });
    await book.addUsers(owner);
    return response.status(200).json(await owner.getBooks());
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

const addcomment = async (request, response) => {
  try {
    const { email } = request.headers;
    const term = request.body;
    const owner = await db.User.findOne({ where: { email } });
    const book = await db.book.findOne({ where: { id: term.bookid } });  
    if  (term.to=='') {
      const comment = await db.comment.create({
        comment: term.comment,
        bookId: term.bookid,
        userId: owner.id,
      });
    } else {
      const comment = await db.comment.create({
        comment: term.comment,
        bookId: term.bookid,
        userId: owner.id,
        to: term.to,
      });
    }
    //return response.status(200).json(await book.getComments());
    const allComments = await book.getComments();
    const strInd = allComments.map(i=>i.id);
    const com = await db.comment.findAll({ where: { id: strInd }, include:[{association: 'Users'}] })    
    return response.status(200).json(com);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки комментария',
      err: err.message,
    });
  }
};
const loadcomment = async (request, response) => {
  try {
    const term = request.body;
    const book = await db.book.findOne({ where: { id: term.bookid } });
    const allComments = await book.getComments();
    const strInd = allComments.map(i=>i.id);
    const com = await db.comment.findAll({ where: { id: strInd }, include:[{association: 'Users'}] })
    
    return response.status(200).json(com);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки комментария',
      err: err.message,
    });
  }
};


const loadautors = async (request, response) => {
  try {
    /* const autors = await db.book.findAll({
      raw: true,
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('autor')), 'autor'],
    }); */
    const autors = await db.autor.findAll({ raw: true });

    return response.status(200).json(autors.map((i) => ({ id: i.id, name: i.name })));
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

const loadganres = async (request, response) => {
  try {
    /* const genres = await db.book.findAll({
      raw: true,
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('genre')), 'genre'],
    }); */
    const genres = await db.genre.findAll({ raw: true });

    return response.status(200).json(genres.map((i) => ({ id: i.id, name: i.name })));
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

const price = async (request, response) => {
  try {
    const findedBookPrice = await db.book.findAll({
      raw: true,
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('price')), 'price'],
    });
    const min = Math.min(...findedBookPrice.map((i) => i.price));
    const max = Math.max(...findedBookPrice.map((i) => i.price));

    return response.status(200).json({ min, max });
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

module.exports = {
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
};
