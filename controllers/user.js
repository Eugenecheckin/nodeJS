const { User } = require('../db');

class UserController {
  async update(request, response) {
    const { updateName } = request.body;
    const { somedata } = request.headers;
    if (!somedata) {
      response.status(403).json({message: "Пользователь не авторизован"})  
    } else {
      await User.update( { fullName: updateName }, {where: { id: somedata }} ).then(res=> {
        response.send({ result: res });    
        });
      }
    }
    
  
  async delete(request, response) {
    const { somedata } = request.headers;
    if (!somedata) {
      response.status(403).json({message: "Пользователь не авторизован"})  
    } else {
      await User.destroy( {where:{ id: somedata }} );
      response.status(200).json({message: "Пользователь удален"})  
    }  
  }
}

module.exports = new UserController();