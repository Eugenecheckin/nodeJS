class UserController {
  async update(request, response) {
    const { updateName } = request.body;
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];
    if (!token) {
      response.status(403).json({message: "Пользователь не авторизован"})  
    } else {  
      const verifyResult = jwt.verify(token, secret);
      if (!verifyResult) {
        response.status(403).json({message: "Ошибка авторизации"})  
      } else {
        await User.update( { fullName: updateName }, {where: { id: verifyResult.userData }} ).then(res=> {
        response.send({ result: res });    
        });  
      }
    }
  }
  async delete(request, response) {
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];
    if (!token) {
      response.status(403).json({message: "Пользователь не авторизован"})  
    } else {  
      const verifyResult = jwt.verify(token, secret);
      if (!verifyResult) {
        response.status(403).json({message: "Ошибка авторизации"})  
      } else {  
          await User.destroy( {where:{ id: verifyResult.userData }} );
          response.status(200).json({message: "Пользователь удален"})  
        }
      }
  }
}

module.exports = new UserController();