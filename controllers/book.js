const db = require('../models/');

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
  const { offset } = request.headers;

  try {
    const loadBook = await db.book.findAndCountAll({
      raw: true,
      offset: offset,
      limit: 10,
    });

    response.status(200).json(loadBook);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

module.exports = { create, load };
