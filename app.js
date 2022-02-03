const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cors());

app.use('/Auth', authRoute);
app.use('/User', userRoute);

module.exports = app;
