'use strict';
require('dotenv').config();
// const events = require('./events.js');
const faker = require('faker');
const net = require('net');
const client = new net.Socket();
const storeName = process.env.STORE || 'blackmarket';
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

// connect to caps server
client.connect(PORT, HOST, () => {
  let order = {};
  setInterval(() => {
    order.storeName = storeName;
    order.orderId = faker.random.uuid();
    order.customerName = faker.name.findName();
    order.address = faker.address.city();

    let message = {
      event: 'pickup',
      payload: order,
    };
    client.write(JSON.stringify(message));
  }, 5000);

  //on receiving data from server
  client.on('data', (data) => {
    let broadcastMessage = JSON.parse(data.toString());
    let event = broadcastMessage['event'];

    if (event === 'delivered') {
      console.log(
        `Thank you for delivering ${broadcastMessage['payload']['orderId']}`
      );
    }
  });

  client.on('close', () => console.log('Connection closed!'));
  client.on('error', (err) => console.log('Logger Error', err.message));

});
