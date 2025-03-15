const { Encoders } = require('../');
const dgram = require('dgram');

const motionBytes = Encoders.RTTrPM(0x01, 0x12345678, [
  Encoders.Trackable('Test', [Encoders.CentroidPosition(100, 1.0, 2.0, 3.0)], undefined),
]);
console.log(motionBytes);

const socket = dgram.createSocket('udp4');

socket.send(motionBytes, 3434, '127.0.0.1', (error) => {
  if (error) {
    console.error(error);
  }
  socket.close(() => {
    process.exit();
  });
});
