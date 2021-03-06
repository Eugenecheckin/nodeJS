import { Handler } from "express";

const hash = require('../utils/hash');
const getToken = require('../utils/getToken');
const db = require('../../models');

const CryptoJS = require('crypto-js');
const { HASH_MESS } = require('../config');


export const signUp: Handler = async (request, response) => {
  const {
    fullName, email, password, phone, isAdmin,
  } = request.body;
  console.log(fullName);
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
      phone,
      isAdmin,
    });
    const token = getToken(createdUser);    
    return response.status(200).json({
      token,
      id: createdUser.id,
      name: createdUser.fullName,
      email: createdUser.email,
      phone: createdUser.phone,
    });
  } catch (err) {
    return response.status(403).json({
      message: 'Ошибка регистрации нового пользователя',
      err: err.message,
    });
  }
};
export const signIn: Handler = async (request, response) => {
  console.log('!!!!!!!!!!!!!!');
  
  const { email, password } = request.body;
  try {
    const signInUser = await db.User.findOne({ where: { email } });
    const bytes = CryptoJS.AES.decrypt(signInUser.password, HASH_MESS);
    const toConfirmPass = bytes.toString(CryptoJS.enc.Utf8);

    if (password===toConfirmPass) {
      const token: string = getToken(signInUser);
      const hghghggdsh = {
        token,
        id: signInUser.id,
        name: signInUser.fullName,
        email: signInUser.email,
        phone: signInUser.phone,
        avatar: signInUser.avatar != null ? signInUser.avatar : '',
        isAdmin: signInUser.isAdmin,
      };
      console.log(hghghggdsh);
      
      return response.status(200).json({
        token,
        id: signInUser.id,
        name: signInUser.fullName,
        email: signInUser.email,
        phone: signInUser.phone,
        avatar: signInUser.avatar != null ? signInUser.avatar : '',
        isAdmin: signInUser.isAdmin,
      });
    } else {
      return response.status(400).json({password: "not confirm"})
    }
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Ошибка входа', err: err.message });
  }
};

export const login: Handler = async (request, response) => {
  const { email } = request.headers;
  try {
    const signInUser = await db.User.findOne({ where: { email } });
    const token: string = getToken(signInUser);
    return response.status(200).json({
      token,
      id: signInUser.id,
      name: signInUser.fullName,
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
      phone: signInUser.phone,
      avatar: signInUser.avatar != null ? signInUser.avatar : '',
    });
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Ошибка входа', err: err.message });
  }
};

export const test: Handler = async (request, response) => {
  const email = 'admin@mail.ru';
  try {
    const allUsers = await db.User.findOne({ where: { email } });
    return response.status(200).json({
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

interface  RequestExtended  { 
  headers : any
  file : any
}
export async function upload(request: RequestExtended, response : any) {
  try {
    const { fileName, email } = request.headers;
    if (request.file) {
      await db.User.update({ avatar: fileName }, { where: { email } });
      return response.status(200).json(request.file);
    }
    return response.status(404).json({ message: 'File not found' });
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Ошибка загрузки', err: err.message });
  }
};
