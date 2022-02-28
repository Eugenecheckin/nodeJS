const { PORT } = require('./config.ts');
import app  from './app';


app.listen(PORT, () => {
  console.log('сервер запущен');
});
