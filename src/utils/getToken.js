const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const getToken = (res) => jwt.sign(
  { email: res.dataValues.email, isAdmin: `${res.isAdmin || false}` },
  SECRET,
);

module.exports = getToken;
