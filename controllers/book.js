const db = require('../models/');

const create = async (request, response) => {
  console.log('func-controller');
  const { title, autor, year, genre, fileName, price } = request.headers;
  console.log(title);
  const isCreated = await db.book.findAll({ where: { title } });
  if (isCreated.length > 0) {
    return response.status(400).json({ message: 'книга уже добавлена' });
  }
  console.log(title, autor, year, genre, fileName, price);
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

module.exports = { create /* , login, signIn, test, upload */ };
