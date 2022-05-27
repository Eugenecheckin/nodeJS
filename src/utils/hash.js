const CryptoJS = require('crypto-js');
const { HASH_MESS } = require('../config');

const hash = (password) => CryptoJS.AES.encrypt(password, HASH_MESS).toString();


module.exports = hash;
