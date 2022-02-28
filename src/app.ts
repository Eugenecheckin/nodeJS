import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import path from 'path';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import bookRouter from './routes/book';

const app = express();
// app.use(express.json({ extended: true }));
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/fileserver', express.static(path.join(__dirname, 'fileserver')));
app.use('/Auth', authRoute);
app.use('/User', userRoute);
app.use('/book', bookRouter);

export default app;
