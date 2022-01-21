const jwt = require('jsonwebtoken');
const { SECRET } = require('../controllers/const')

module.exports = (request, response, next) => {
  if (request.metod === "OPTIONS") {
    next()
  }
  try {  
    const { authorization } = request.headers;
    console.log(authorization);
    const token = authorization.split(' ')[1];  
    const verifyResult = jwt.verify(token, SECRET);
    request.headers.somedata = verifyResult.userData;
    next();
  } catch {
    return response.status(403).json({message: "Пользователь не авторизован"})
  }
}