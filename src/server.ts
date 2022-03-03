const { PORT } = require('./config.ts');
import app  from './app';

import http  from 'http';
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

io.use((socket:any, next:any) => {
  const testMess = socket.handshake.auth.testMess;
  if (!testMess) {
    return next(new Error("invalid username"));
  }
  socket.testMess = testMess;
  next();
});

io.on("connection", (socket:any) => {
  // fetch existing users
  const users = [];
  for (let [ id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      testMess: socket.testMess,
    });
  }
  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    username: socket.testMess,
  });
});

server.listen(PORT, () => {
  console.log('сервер запущен '+PORT);
});