const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

module.exports = (request, response, next) => {
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
