const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();
app.use(express.json({ extended: true }));
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cors());
app.use('/fileserver', express.static(path.join(__dirname, 'fileserver')));
console.log(path.join(__dirname, 'fileserver'));
app.use('/Auth', authRoute);
app.use('/User', userRoute);

module.exports = app;
