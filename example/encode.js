const { Encoders } = require('../');
const dgram = require('dgram');

const motionBytes = Encoders.RTTrPM(0x01, 0x12345678, [
  Encoders.Trackable(
    'Test',
    [
      Encoders.CentroidPosition(100, 1.0, 2.0, 3.0),
      Encoders.CentroidAccelVelocity(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0),
      Encoders.TrackedPointPosition(100, 1.0, 2.0, 3.0, 1),
      Encoders.TrackedPointAccelVelocity(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 1),
      Encoders.TrackedPointPosition(100, 1.0, 2.0, 3.0, 2),
      Encoders.TrackedPointAccelVelocity(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 2),
      Encoders.OrientationEuler(100, 0x0123, 1, 2, 3),
      Encoders.OrientationQuaternion(100, 1, 2, 3, 4),
    ],
    Math.floor(Date.now() / 1000)
  ),
]);
console.log(motionBytes);
