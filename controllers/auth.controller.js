const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const { HASH_MESS, SECRET } = require('./const')
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
        fullName: fullName,
        email: email,
        password: hasPassword,
        dob: dob,
        }).then(res=> {
        const token = jwt.sign({ userData: res.dataValues.id }, SECRET);
        response.json({ token: token });
        }).catch(err=>console.log(err));   
      }     
  }
  async login(request, response) {  
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];
    if (!token) {
      response.status(403).json({message: "Пользователь не авторизован"})  
    } else {  
      const verifyResult = jwt.verify(token, SECRET);
      if (!verifyResult) {
        response.status(404).json({message: "Ошибка авторизации"})  
      } else {
        const allUsers = await User.findAll({ where:{ id: verifyResult.userData } });
        response.send({id: allUsers[0].id, name: allUsers[0].fullName, email: allUsers[0].email});
      }
    }
  }
}

module.exports = new AuthController();