const jwt = require('jsonwebtoken');
const { SECRET } = require('../controllers/const')

module.exports = (request, response, next) => {  
  try {  
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];  
    const verifyResult = jwt.verify(token, SECRET);
    request.headers.userId = verifyResult.userData;
    next();
  } catch {
    return response.status(403).json({message: "Пользователь не авторизован"})
  }
}