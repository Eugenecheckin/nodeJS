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
app.post('/createUser', jsonParser, async (request, response)=> {
  const { fullName, email, password, dob } = request.body;
  const isRegistred = await User.findAll({ where:{ fullName:fullName } });  
  if (isRegistred.length>0) {
    response.status(400).json({message: "Пользователь с таким именем уже зарегистрирован"})
  }    
  const hasPassword = CryptoJS.AES.encrypt(hassMess, password).toString();
  
  const newUser = await User.create({
  fullName: fullName,
  email: email,
  password: hasPassword,
  dob: dob,
  }).then(res=>{
  }).catch(err=>console.log(err));
  
  const token = jwt.sign({ userData: fullName }, secret);
  response.json(token);     
});
app.get('/getUser/:fullName', async (request, response)=> {
  const allUsers = await User.findAll();
  response.send(allUsers);
});
app.get('/getUser', async (request, response)=> {
  const allUsers = await User.findAll();
  response.send(allUsers);
});
app.put('/updateUser', async (request, response)=> {
  const allUsers = await User.findAll();
  response.send(allUsers);
});
app.delete('/deleteUser', async (request, response)=> {
  const allUsers = await User.findAll();
  response.send(allUsers);
});
app.listen(3000, ()=> {
  console.log('сервер запущен')
});
