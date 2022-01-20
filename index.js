const express = require('express');
const bodyParser = require('body-parser')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const { SequelizePg, User } = require('./db');

async function testConn() {
  try {
    await SequelizePg.authenticate();
    console.log('Соединение установлено');
  } catch (error) {
    console.error('Ошибка соединения:', error);
  }
}
testConn();

SequelizePg.sync();

const secret = 'TEST_SECRET';

const jsonParser = bodyParser.json();

const app = express();

app.get('/',  (req, response)=> {
  response.send('hello world')
});

const hassMess = "hassMess";
app.post('/signup', jsonParser, async (request, response)=> {
  const { fullName, email, password, dob } = request.body;
  const isRegistred = await User.findAll({ where:{ fullName:fullName } });  
  if (isRegistred.length>0) {
    response.status(400).json({message: "Пользователь с таким именем уже зарегистрирован"})
  } else {   
  const hasPassword = CryptoJS.AES.encrypt(hassMess, password).toString();  
  const newUser = await User.create({
  fullName: fullName,
  email: email,
  password: hasPassword,
  dob: dob,
  }).then(res=>{
  }).catch(err=>console.log(err));  
  const token = jwt.sign({ userData: fullName }, secret);
  response.json({ token: token });
  }     
});
app.get('/login', jsonParser, async (request, response)=> {
  const { fullName } = request.body;
  const { authorization } = request.headers;
  const token = authorization.split(' ')[1];
  if (!token) {
    response.status(403).json({message: "Пользователь не авторизован"})  
  } else {  
  const verifyResult = jwt.verify(token, secret);
  if (!verifyResult) {
    response.status(403).json({message: "Ошибка авторизации"})  
  } else {  
  const allUsers = await User.findAll({ where:{ fullName: verifyResult.userData } });
  response.send(allUsers);
  }
  }
});
app.put('/update', jsonParser, async (request, response)=> {
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
  let test = await User.findAll( {where: { fullName: verifyResult.userData }} );
  test.fullName = updateName;
  const newUser = await User.update( test, {where: { fullName: verifyResult.userData }} );
  response.send({ result: newUser });
  }
  }
});
app.delete('/delete', jsonParser, async (request, response)=> {
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
  await User.destroy( {where:{ fullName: updateName }} );
  response.status(200).json({message: "Пользователь удален"})  
  }
  }
});
app.listen(3000, ()=> {
  console.log('сервер запущен')
});
