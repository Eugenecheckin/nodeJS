class AuthController{
  async sinUp(request, response) {
    const { fullName, email, password, dob } = request.body;
    const isRegistred = await User.findAll({ where:{ fullName:fullName } });  
    if (isRegistred.length>0) {
      response.status(400).json({message: "Пользователь с таким именем уже зарегистрирован"})
    } else {   
        const hasPassword = CryptoJS.AES.encrypt(hassMess, password).toString();  
        await User.create({
        fullName: fullName,
        email: email,
        password: hasPassword,
        dob: dob,
        }).then(res=> {
        console.log(res.dataValues.id);
        const token = jwt.sign({ userData: res.dataValues.id }, secret);
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
      const verifyResult = jwt.verify(token, secret);
      if (!verifyResult) {
        response.status(403).json({message: "Ошибка авторизации"})  
      } else {  
        console.log(verifyResult.userData);
        const allUsers = await User.findAll({ where:{ id: verifyResult.userData } });
        response.send(allUsers);
      }
    }
  }
}

module.exports = new AuthController();