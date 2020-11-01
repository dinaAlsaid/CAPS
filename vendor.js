'use strict';

const events = require('./events.js');
const faker = require('faker');

const storeName = process.env.STORE;
//storeName, orderId, customerName, address
let payload = {};

setInterval(() => {
  payload.storeName=storeName;
  payload.orderId=faker.random.uuid();
  payload.customerName=faker.name.findName();
  payload.address=faker.address.city();
  events.emit('pickup',{payload});
}, 5000);

events.on('delivered',()=>{console.log('thank you');})
