const jwt = require('jsonwebtoken');
const { SECRET } = require('../config')

const getToken = ( res )=> {
  return jwt.sign( { email: res.dataValues.email, isAdmin: `${res.isAdmin||false}` }, SECRET );  
}

module.exports = getToken;
