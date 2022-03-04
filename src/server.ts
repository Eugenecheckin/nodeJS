const { PORT } = require('./config.ts');
import app  from './app';

import http  from 'http';
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use((socket:any, next:any) => {
  const email = socket.handshake.auth.email;
  if (!email) {
    return next(new Error("invalid username"));
  }
  socket.email = email;
  next();
});

io.on("connection", (socket:any) => {
  // fetch existing users
  const users = [];
  for (let [ id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      email: socket.email,
    });
  }
  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    email: socket.email,
  });

  socket.on("repost", ({ to, from }:any) => {
    for (let [ id, socket] of io.of("/").sockets) {
      if(socket.email===to) {     
        socket.emit("users", {
          userID: socket.id,
          email: socket.email,
          from: from,
        });
      }      
    }    
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.email);
  });

});

server.listen(PORT, () => {
  console.log('сервер запущен '+PORT);
});