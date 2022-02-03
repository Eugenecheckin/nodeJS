const hash = require('../utils/hash');
const getToken = require('../utils/getToken.js');

const db = require('../models/');

const signUp = async (request, response) => {
  const { fullName, email, password, dob, isAdmin } = request.body;
  const isRegistred = await db.User.findAll({ where: { email } });
  if (isRegistred.length > 0) {
    return response
      .status(400)
      .json({ message: 'Пользователь с таким именем уже зарегистрирован' });
  }
  const hasPassword = hash(password);
  try {
    const createdUser = await db.User.create({
      fullName,
      email,
      password: hasPassword,
      dob,
      isAdmin,
    });
    const token = getToken(createdUser);
    response.status(200).json({ token, fullName, email });
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка регистрации нового пользователя',
      err: err.message,
    });
  }
};
const signIn = async (request, response) => {
  const { email, password } = request.body;
  const hasPassword = hash(password);
  try {
    const signInUser = await db.User.findOne({ where: { email } });
    const token = getToken(signInUser);
    return response.status(200).json({
      token,
      id: signInUser.id,
      name: signInUser.fullName,
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
    });
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Ошибка входа', err: err.message });
  }
};

const login = async (request, response) => {
  const { email } = request.headers;
  try {
    const allUsers = await db.User.findOne({ where: { email } });
    response.status(200).json({
      id: allUsers.id,
      name: allUsers.fullName,
      email: allUsers.email,
      isAdmin: allUsers.isAdmin,
    });
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Ошибка входа', err: err.message });
  }
};

const test = async (request, response) => {
  const email = 'admin@mail.ru';
  try {
    const allUsers = await db.User.findOne({ where: { email } });
    response.status(200).json({
      id: allUsers.id,
      name: allUsers.fullName,
      email: allUsers.email,
      isAdmin: allUsers.isAdmin,
    });
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Ошибка входа', err: err.message });
  }
};

module.exports = { signUp, login, signIn, test };
