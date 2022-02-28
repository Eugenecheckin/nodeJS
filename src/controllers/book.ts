import { Handler } from "express";
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const db = require('../../models');

export const create: Handler = async (request, response) => {
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
interface IStringObject{[index: string]:any}

export const load: Handler = async (request, response) => {
  try {
    const { offset } = request.headers;

    const term: {[index: string]:any} = request.body;

    if (Object.keys(term).length > 0) {
      const findOption = {
        where: {},
        raw: true,
        offset,
        limit: 10,
      };
      Object.keys(term).forEach((i) => {
        if (i === 'price') {
          // @ts-ignore
          findOption.where[i] = { [Op.between]: term[i].split('-') };
        } else {
          // @ts-ignore
          findOption.where[i] = term[i].split('-');
        }
      });
      const loadBooks = await db.book.findAndCountAll(findOption);
      return response.status(200).json(loadBooks);
    }
    const loadBooks = await db.book.findAndCountAll({
      // raw: true,
      offset,
      limit: 10,
    });
    return response.status(200).json(loadBooks);
  } catch (err) {
    return response.status(404).json({ message: err.message });
  }
};

export const loadAll: Handler = async (request, response) => {
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

export const loadCart: Handler = async (request, response) => {
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

export const addToCart: Handler = async (request, response) => {
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
export const removeToCart: Handler = async (request, response) => {
  try {
    const { email, bookid } = request.headers;
    const owner = await db.User.findOne({ where: { email } });
    const book = await db.book.findOne({ where: { id: bookid } });
    await book.removeUsers(owner);

    return response.status(200).json(await owner.getBooks());
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};
export const addRating: Handler = async (request, response) => {
  try {
    const { email } = request.headers;
    const term = request.body;
    const owner = await db.User.findOne({ where: { email } });
    const book = await db.book.findOne({ where: { id: term.bookid } });
    const exestedRating = await db.rating.findOne({ where: { UserId: owner.id} })
    if(exestedRating!==null){
      await db.rating.update({rating: term.rating},{ where: { UserId: owner.id } },)
    } else {
       await db.rating.create({
        rating: term.rating,
        bookId: term.bookid,
        userId: owner.id,
      });
    }
    const allRatings = await book.getRatings();
    let resultRating = 0;
     if (allRatings.length > 0){
      let sum = 0;
      allRatings.map((i:any)=>i.rating).forEach((s:any)=>sum+=s);
      console.log(sum);
      resultRating = Math.round(Math.floor((sum+3.475*2)/(allRatings.length+2)*10)/10);
    }    
    return response.status(200).json({resultRating: resultRating});
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};
export const loadRating: Handler = async (request, response) => {
  try {
    const term = request.body;       
    const allRatings = await db.rating.findAll({ where: { bookId: term.bookid } }); 
    let resultRating = 0;
     if (allRatings.length > 0){
      let sum = 0;
      allRatings.map((i:any)=>i.rating).forEach((s:any)=>sum+=s);
      resultRating = Math.round(Math.floor((sum+3.475*2)/(allRatings.length+2)*10)/10); 
    }
    return response.status(200).json({resultRating: resultRating});
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};


export const addComment: Handler = async (request, response) => {
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
    const strInd = allComments.map((i:any)=>i.id);
    const com = await db.comment.findAll({ where: { id: strInd }, include:[{association: 'Users'}] })        
    return response.status(200).json(com);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки комментария',
      err: err.message,
    });
  }
};
export const loadComment: Handler = async (request, response) => {
  try {
    const term = request.body;
    const book = await db.book.findOne({ where: { id: term.bookid } });
    const allComments = await book.getComments();
    const strInd = allComments.map((i:any)=>i.id);
    const com = await db.comment.findAll({ where: { id: strInd }, include:[{association: 'Users'}] })
    
    return response.status(200).json(com);
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки комментария',
      err: err.message,
    });
  }
};


export const loadAutors: Handler = async (request, response) => {
  try {
    const autors = await db.autor.findAll({ raw: true });

    return response.status(200).json(autors.map((i:any) => ({ id: i.id, name: i.name })));
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

export const loadGanres: Handler = async (request, response) => {
  try {
    const genres = await db.genre.findAll({ raw: true });

    return response.status(200).json(genres.map((i:any) => ({ id: i.id, name: i.name })));
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка загрузки книг',
      err: err.message,
    });
  }
};

export const price: Handler = async (request, response) => {
  try {
    const findedBookPrice = await db.book.findAll({
      raw: true,
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('price')), 'price'],
    });
    const min = Math.min(...findedBookPrice.map((i:any) => i.price));
    const max = Math.max(...findedBookPrice.map((i:any) => i.price));

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
};
