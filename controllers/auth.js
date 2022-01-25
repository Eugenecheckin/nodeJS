const hash = require('../utils/hash');
const getToken = require('../utils/getToken.js');

const db = require('../models/');

const sinUp = async (request, response) => {
  const { fullName, email, password, dob, isAdmin } = request.body;
  const isRegistred = await db.User.findAll({ where:{ email } });  
  if (isRegistred.length>0) {
    response.status(400).json({message: "Пользователь с таким именем уже зарегистрирован"})
  } else {   
      const hasPassword = hash(password);  
      await db.User.create({
        fullName,
        email,
        password: hasPassword,
        dob,
        isAdmin
      }).then(res=> {
        const token = getToken(res);
        response.status(200).json({ token });
      }).catch(err=>console.log(err));   
    }
}

const login = async (request, response) => {
  const { email } = request.headers;    
  const allUsers = await db.User.findOne({ where:{ email } });
  response.status(200).json( {
    id: allUsers.id,
    name: allUsers.fullName,
    email: allUsers.email,
    isAdmin: allUsers.isAdmin
  });   
}

module.exports = { sinUp, login };