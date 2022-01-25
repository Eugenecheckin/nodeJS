const db = require('../models/');

  const update = async (request, response) => {
    const { fullName } = request.body;
    const { email , isAdmin } = request.headers;
    if(isAdmin) {
      const { newEmail } = request.body;
      await db.User.update( { fullName }, {where: { email: newEmail }} ).then(res=> {
        response.status(200).json({
          result: res,
          fullName,
          newEmail
        });    
      });
    } else {     
      await db.User.update( { fullName }, {where: { email }} ).then(res=> {
        response.status(200).json({
          result: res,
          fullName,
          email
        });    
      });
    }
  }   
  
  const destroy = async (request, response) => {
    const { isAdmin , email} = request.headers;
    if (isAdmin) {
      const { newEmail} = request.body;
      await db.User.destroy( {where:{ email: newEmail }} );
      response.status(200).json({message: "Пользователь удален", newEmail})
    } else {
      await db.User.destroy( {where:{ email }} );
      response.status(200).json({message: "Пользователь удален", email})
    }
  }

  const getList = async (request, response) => { 
    const users =await db.User.findAll();
    response.status(200).json(users);     
  }

  const create = async (request, response) => {
  const { fullName, newEmail, password, dob, isAdmin } = request.body;
  const isRegistred = await db.User.findAll({ where:{ fullName:fullName } });  
  if (isRegistred.length>0) {
    response.status(400).json({message: "Пользователь с таким именем уже зарегистрирован"})
  } else {   
      const hasPassword = hash(password);  
      await db.User.create({
        fullName,
        email: newEmail,
        password: hasPassword,
        dob,
        isAdmin
      }).then(res=> {
        const token = getToken(res);
        response.status(200).json({ token });
      }).catch(err=>console.log(err));   
    }  
  }

module.exports = { update, destroy, create, getList };
