const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

module.exports = (request, response, next) => {
  try {
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];
    const verifyResult = jwt.verify(token, SECRET);

    if (verifyResult.isAdmin !== 'true') {
      return response
        .status(403)
        .json({ message: 'Пользователь не администратор' });
    }
    request.headers.isAdmin = verifyResult.isAdmin;
    request.headers.email = verifyResult.email;
    next();
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Ошибка идентификации', err: err.message });
  }
};
