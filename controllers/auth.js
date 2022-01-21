const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const { HASH_MESS, SECRET } = require('../config')
const { User } = require('../db');

class AuthController {
  async sinUp(request, response) {
    const { fullName, email, password, dob } = request.body;
    const isRegistred = await User.findAll({ where:{ fullName:fullName } });  
    if (isRegistred.length>0) {
      response.status(400).json({message: "Пользователь с таким именем уже зарегистрирован"})
    } else {   
        const hasPassword = CryptoJS.AES.encrypt(HASH_MESS, password).toString();  
        await User.create({
          fullName,
          email,
          password: hasPassword,
          dob,
        }).then(res=> {
          const token = jwt.sign({ userData: res.dataValues.id }, SECRET);
          response.status(200).json({ token });
        }).catch(err=>console.log(err));   
      }     
  }
  async login(request, response) {
    const { userId } = request.headers;    
    const allUsers = await User.findOne({ where:{ id: userId } });
    response.status(200).json({id: allUsers.id, name: allUsers.fullName, email: allUsers.email});   
  }
}

module.exports = new AuthController();