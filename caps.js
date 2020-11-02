'use strict';
const events = require('./events.js');

events.on('in-transit', (payload) => {
  let EVENT = {
    event: 'in-transit',
    time: Date.now(),
    payload,
  };
  console.log(EVENT);
});
events.on('delivered', (payload) => {
  let EVENT = {
    event: 'delivered',
    time: Date.now(),
    payload,
  };
  console.log(EVENT);
});
events.on('pickup', (payload) => {
  let EVENT = {
    event: 'pickup',
    time: Date.now(),
    payload,
  };
  console.log(EVENT);
});

require('./driver.js');
require('./vendor.js');
