'use strict';
//main server
require('dotenv').config();
const io = require('socket.io')(4000);
// name space
const caps = io.of('/caps');
let currentRoom = '';
caps.on('connection', (socket) => {
  console.log(`socket is ${socket.id}`);
  socket.on('join', (room) => {
    socket.leave(currentRoom);
    socket.join(room);
    currentRoom=room;
    console.log(room);
  });
  socket.on('pickup',(payload)=>{
    console.log('pickup',payload);
    caps.emit('pickup',payload);
  })
  socket.on('in-transit',(payload)=>{
    console.log('in-transit',payload);

    caps.to(currentRoom).emit('in-transit',payload)
  })
  socket.on('delivered',(payload)=>{
    console.log('delivered',payload);

    caps.to(currentRoom).emit('delivered',payload)

  })
});
