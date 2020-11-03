'use strict';
require('dotenv').config();
const io = require('socket.io-client');
const caps = io.connect('http://localhost:4000/caps');

const faker = require('faker');
const storeName = process.env.STORE || 'blackmarket';

caps.on('connect', () => {
  setInterval(() => {
    caps.emit('join', storeName);

    let order = {
      storeName: storeName,
      orderId: faker.random.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.city(),
    };

    caps.emit('pickup', order);
  }, 5000);

  caps.on('delivered', (payload) => {

    console.log(`Thank you for delivering ${payload.orderId}`);
  });
});

