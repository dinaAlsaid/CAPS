'use strict';

const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

client.connect(PORT, HOST, () => {
  client.on('data', (buffer) => {
    let broadcastMessage = JSON.parse(buffer.toString());
    let event = broadcastMessage['event'];
    if (event === 'pickup') {
      let message = {
        event: 'in-transit',
        payload: broadcastMessage['payload'],
      };
      setTimeout(() => {
        console.log(`Picking up ${broadcastMessage['payload']['orderId']}`);
        client.write(JSON.stringify(message));
      }, 1000);

      setTimeout(() => {
        message.event = 'delivered';
        console.log(message.event);

        client.write(JSON.stringify(message));
      }, 3000);
    }
  });
  client.on('close', () => console.log('Connection closed!'));
  client.on('error', (err) => console.log('Logger Error', err.message));

});

