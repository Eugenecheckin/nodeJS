const { User } = require('../db');

class UserController {
  async update(request, response) {
    const { fullName } = request.body;
    const { userId } = request.headers;    
    await User.update( { fullName }, {where: { id: userId }} ).then(res=> {
      response.status(200).json({ result: res });    
    });
  }   
  
  async delete(request, response) {
    const { userId } = request.headers;    
    await User.destroy( {where:{ id: userId }} );
    response.status(200).json({message: "Пользователь удален"})     
  }
}

module.exports = new UserController();