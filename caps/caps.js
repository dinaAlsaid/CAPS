'use strict';
require('dotenv').config();
// const events = require('../events.js');
const net = require('net');
// const client = new net.Socket();
// const HOST= process.env.HOST;
const PORT = process.env.PORT;
const server = net.createServer();
let clientPool = {};

server.listen(PORT,()=>{console.log(`listening on port ${PORT}`);});


server.on('connection',(socket)=>{
  clientPool[id]=socket;
})
server.on('data',(messageString)=>{
  const message = JSON.parse(messageString);
  /*TODO*/
  //     Read and parse the incoming data/payload
  // Verify that the data is legitimate
  // Is it a JSON object with both an event and payload properties?
  // If the payload is ok, broadcast the raw data back out to each of the other connected clients
})

// events.on('in-transit', (payload) => {
//   let EVENT = {
//     event: 'in-transit',
//     time: Date.now(),
//     payload,
//   };
//   console.log(EVENT);
// });
// events.on('delivered', (payload) => {
//   let EVENT = {
//     event: 'delivered',
//     time: Date.now(),
//     payload,
//   };
//   console.log(EVENT);
// });
// events.on('pickup', (payload) => {
//   let EVENT = {
//     event: 'pickup',
//     time: Date.now(),
//     payload,
//   };
//   console.log(EVENT);
// });

require('./driver.js');
require('./vendor.js');
