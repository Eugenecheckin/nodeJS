const CryptoJS = require("crypto-js");
const { HASH_MESS } = require('../config')

const hash = ( password ) => {
  return CryptoJS.AES.encrypt(HASH_MESS, password).toString();
}

module.exports = hash;
