import { Handler } from "express";
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

function isOwner(request:any, response:any, next:any) {
  try {
    const { authorization } = request.headers;
    console.log(authorization);
    const token = authorization.split(' ')[1];

    const verifyResult = jwt.verify(token, SECRET);
    request.headers.email = verifyResult.email;
    request.headers.isAdmin = verifyResult.isAdmin;
    return next();
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Пользователь не авторизован' });
  }
};

export default isOwner;