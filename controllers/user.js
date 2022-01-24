const db = require('../models/');


  const update = async (request, response) => {
    const { fullName } = request.body;
    const { email } = request.headers;    
    await db.User.update( { fullName }, {where: { email }} ).then(res=> {
      response.status(200).json({
        result: res,
        fullName,
        email
      });    
    });
  }   
  
  const destroy = async (request, response) => {
    const { email } = request.headers;    
    await db.User.destroy( {where:{ email }} );
    response.status(200).json({message: "Пользователь удален"})     
  }


module.exports = { update, destroy };