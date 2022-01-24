const db = require('../models/');

class UserController {
  async update(request, response) {
    const { fullName } = request.body;
    const { email } = request.headers;    
    await db.User.update( { fullName }, {where: { email: email }} ).then(res=> {
      response.status(200).json({ result: res, fullName, email });    
    });
  }   
  
  async delete(request, response) {
    const { email } = request.headers;    
    await db.User.destroy( {where:{ email: email }} );
    response.status(200).json({message: "Пользователь удален"})     
  }
}

module.exports = new UserController();