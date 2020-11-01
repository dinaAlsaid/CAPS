'use strict';

const events = require('./events.js');

events.on('pickup',(payload)=>pickupHandler(payload));

function pickupHandler(payload){
  setTimeout(()=>{
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit',payload);
  },1000);

  setTimeout(()=>{
    console.log('delivered');
    events.emit('delivered',payload);
  },3000);
}