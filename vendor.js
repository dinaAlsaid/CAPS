'use strict';

const events = require('./events.js');
const faker = require('faker');
require('dotenv').config();

const storeName = process.env.STORE;

let payload = {};
events.on('delivered',()=>{console.log('thank you');})

setInterval(() => {
  payload.storeName=storeName;
  payload.orderId=faker.random.uuid();
  payload.customerName=faker.name.findName();
  payload.address=faker.address.city();
  events.emit('pickup',payload);
}, 5000);

