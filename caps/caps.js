'use strict';
require('dotenv').config();
const net = require('net');
const uuid = require('uuid').v4;
const PORT = process.env.PORT || 4000;
const server = net.createServer();
let clientPool = {};

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

server.on('connection', (socket) => {
  console.log('socket connected');
  let id = `socket-${uuid()}`;
  clientPool[id] = socket;
  socket.on('error', (e) => console.log('SOCKET ERROR', e.message));
  socket.on('end', (id) => delete clientPool[id]);
  socket.on('data', (buffer) => {
    var message = JSON.parse(buffer.toString());
    console.log(message);
    if (message['event'] && message['payload']) {
      for (let socket in clientPool) {
        clientPool[socket].write(buffer);
      }
    }
  });
});

