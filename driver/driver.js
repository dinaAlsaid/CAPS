'use strict';

const io = require('socket.io-client');
const caps = io.connect('http://localhost:4000/caps');


caps.on('connect',()=>{
  caps.on('pickup',(payload)=>{

    setTimeout(() => {
      console.log(`Picking up ${payload.orderId}`);
      caps.emit('in-transit',payload);
    }, 1500);

    setTimeout(() => {
      console.log('delivered');
      caps.emit('delivered',payload);
    }, 3000);
  
  });

})
