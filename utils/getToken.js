const jwt = require('jsonwebtoken');
const { SECRET } = require('../config')

const getToken = (res)=> {
  return jwt.sign({ userData: res.dataValues.email }, SECRET);  
}

module.exports = getToken;