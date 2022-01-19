const express = require('express');
const bodyParser = require('body-parser')

const {SequelizePg, User } = require('./db');

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
/* SequelizePg.sync({forse:true}).then(()=> {
  User.create({
    fullName: 'test user',
    email: 'test@mail.ru',
    password: '1abc',
    dob: new Date(1922, 11, 30),
  })
}) */


const jsonParser = bodyParser.json()

const app = express();

app.get('/',  (req, response)=> {
  response.send('hello world')
});
app.post('/createUser', jsonParser, async (request, response)=> {
  const { fullName, email, password, dob } = request.body;
  console.log(fullName);
  await User.create({
  fullName: fullName,
  email: email,
  password: password,
  dob: dob,
  }).then(res=>{
  console.log(res);
  }).catch(err=>console.log(err));    
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
