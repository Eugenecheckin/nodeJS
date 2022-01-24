const express = require('express');
const bodyParser = require('body-parser')

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use('/Auth', authRoute);
app.use('/User', userRoute);

module.exports = app;



