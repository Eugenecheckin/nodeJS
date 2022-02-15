const db = require('../models/');
const Sequelize = require('sequelize');

const create = async (request, response) => {
  const { title, autor, year, genre, price } = request.body;
  const { fileName } = request.headers;
  console.log(title, autor, year, genre, price, fileName);
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

    response.status(200).json(createdBook);
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
      const termReplaced = term[Object.keys(term)[0]].map((i) =>
        i.replace('-', ' ')
      );
      const columm = Object.keys(term)[0];
      const findOption = {
        where: {},
        raw: true,
        offset: 0,
        limit: 10,
      };
      Object.keys(term).forEach((i) => (findOption.where[i] = term[i]));
      console.log(findOption);

      const loadBooks = await db.book.findAndCountAll({
        where: {
          autor: termReplaced,
        },
        raw: true,
        offset: offset,
        limit: 10,
      });
      return response.status(200).json(loadBooks);
    }
    const loadBooks = await db.book.findAndCountAll({
      raw: true,
      offset: offset,
      limit: 10,
    });
    response.status(200).json(loadBooks);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

const loadall = async (request, response) => {
  try {
    const loadBook = await db.book.findAll({
      raw: true,
    });

    response.status(200).json(loadBook);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

const loadautors = async (request, response) => {
  try {
    const autors = await db.book.findAll({
      raw: true,
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('autor')), 'autor'],
    });

    response.status(200).json(autors);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

const loadganres = async (request, response) => {
  try {
    const genres = await db.book.findAll({
      raw: true,
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('genre')), 'genre'],
    });

    response.status(200).json(genres);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

const price = async (request, response) => {
  try {
    const price = await db.book.findAll({
      raw: true,
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('price')), 'price'],
    });
    const min = Math.min(...price.map((i) => i.price));
    const max = Math.max(...price.map((i) => i.price));

    response.status(200).json({ min, max });
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

module.exports = { create, load, loadall, loadautors, loadganres, price };
