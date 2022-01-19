const express = require('express');
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

const app = express();
app.get('/', (request, response)=> {
  response.send('hello world')
});
app.get('/alluser', async (request, response)=> {
  const allUsers = await User.findAll();
  response.send(allUsers);

});

app.listen(3000, ()=> {
  console.log('сервер запущен')
});
