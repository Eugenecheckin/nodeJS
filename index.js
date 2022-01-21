const express = require('express');
const bodyParser = require('body-parser')

const { SequelizePg } = require('./db');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

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

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use('/Auth', authRoute);
app.use('/User', userRoute);

app.listen(3000, ()=> {
  console.log('сервер запущен')
});
