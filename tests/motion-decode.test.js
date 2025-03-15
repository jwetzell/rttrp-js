const { deepEqual, throws } = require('assert');
const { describe, it } = require('node:test');
const { Decoders } = require('../dist/cjs');
const goodTests = [
  {
    description: 'Centroid Position',
    bytes: new Uint8Array([
      0x02, 0x00, 0x1d, 0x00, 0x10, 0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x40, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ]),
    expected: {
      type: 0x02,
      size: 0x1d,
      latency: 16,
      x: 1.0,
      y: 2.0,
      z: 3.0,
    },
    decoder: Decoders.CentroidPosition,
  },
  {
    description: 'Tracked Point Position',
    bytes: new Uint8Array([
      0x06, 0x00, 0x1e, 0x00, 0x10, 0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x40, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    ]),
    expected: {
      type: 0x06,
      size: 0x1e,
      latency: 16,
      x: 1.0,
      y: 2.0,
      z: 3.0,
      index: 1,
    },
    decoder: Decoders.TrackedPointPosition,
  },
  {
    description: 'Orientation (Quaternion)',
    bytes: new Uint8Array([
      0x03, 0x00, 37, 0x00, 0x10, 0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x40, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ]),
    expected: {
      type: 0x03,
      size: 37,
      latency: 16,
      Qx: 1.0,
      Qy: 2.0,
      Qz: 3.0,
      Qw: 4.0,
    },
    decoder: Decoders.OrientationQuaternion,
  },
  {
    description: 'Orientation (Euler)',
    bytes: new Uint8Array([
      0x04, 0x00, 31, 0x00, 0x10, 0x01, 0x23, 0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x40, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ]),
    expected: {
      type: 0x04,
      size: 31,
      latency: 16,
      order: 0x0123,
      r1: 1.0,
      r2: 2.0,
      r3: 3.0,
    },
    decoder: Decoders.OrientationEuler,
  },
  {
    description: 'Centroid Acceleration and Velocity',
    bytes: new Uint8Array([
      0x20, 0x00, 51, 0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x40, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x80, 0x00, 0x00, 0x40, 0xa0, 0x00, 0x00, 0x40, 0xc0, 0x00,
      0x00, 0x40, 0xe0, 0x00, 0x00, 0x41, 0x00, 0x00, 0x00, 0x41, 0x10, 0x00, 0x00,
    ]),
    expected: {
      type: 0x20,
      size: 51,
      x: 1.0,
      y: 2.0,
      z: 3.0,
      accelX: 4.0,
      accelY: 5.0,
      accelZ: 6.0,
      velocityX: 7.0,
      velocityY: 8.0,
      velocityZ: 9.0,
    },
    decoder: Decoders.CentroidAccelVelocity,
  },
  {
    description: 'Tracked Point Acceleration and Velocity',
    bytes: new Uint8Array([
      0x21, 0x00, 52, 0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x40, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x80, 0x00, 0x00, 0x40, 0xa0, 0x00, 0x00, 0x40, 0xc0, 0x00,
      0x00, 0x40, 0xe0, 0x00, 0x00, 0x41, 0x00, 0x00, 0x00, 0x41, 0x10, 0x00, 0x00, 0x01,
    ]),
    expected: {
      type: 0x21,
      size: 52,
      x: 1.0,
      y: 2.0,
      z: 3.0,
      accelX: 4.0,
      accelY: 5.0,
      accelZ: 6.0,
      velocityX: 7.0,
      velocityY: 8.0,
      velocityZ: 9.0,
      index: 1,
    },
    decoder: Decoders.TrackedPointAccelVelocity,
  },
  {
    description: 'Zone Collision Detection',
    bytes: new Uint8Array([
      0x22, 0x00, 0x14, 0x02, 0x08, 0x06, 0x7a, 0x6f, 0x6e, 0x65, 0x20, 0x31, 0x08, 0x06, 0x7a, 0x6f, 0x6e, 0x65, 0x20,
      0x32,
    ]),
    expected: {
      type: 0x22,
      size: 20,
      numberOfZones: 2,
      zones: [
        {
          size: 0x08,
          nameLength: 0x06,
          name: 'zone 1',
        },
        {
          size: 0x08,
          nameLength: 0x06,
          name: 'zone 2',
        },
      ],
    },
    decoder: Decoders.ZoneCollisionDetection,
  },
  {
    description: 'Zone Object',
    bytes: new Uint8Array([0x08, 0x06, 0x7a, 0x6f, 0x6e, 0x65, 0x20, 0x31]),
    expected: {
      size: 0x08,
      nameLength: 0x06,
      name: 'zone 1',
    },
    decoder: Decoders.ZoneObject,
  },
  {
    description: 'Trackable (with Timestamp) + Centroid Position Module',
    bytes: new Uint8Array([
      81, 0, 42, 4, 84, 101, 115, 116, 103, 213, 152, 27, 1, 2, 0, 29, 0, 100, 63, 240, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0,
      0, 0, 0, 0, 64, 8, 0, 0, 0, 0, 0, 0,
    ]),
    expected: {
      type: 0x51,
      size: 42,
      nameLength: 4,
      name: 'Test',
      timestamp: 1742051355,
      numberOfModules: 1,
      modules: [
        {
          type: 0x02,
          size: 29,
          latency: 100,
          x: 1,
          y: 2,
          z: 3,
        },
      ],
    },
    decoder: Decoders.Trackable,
  },
  {
    description: 'Trackable (with Timestamp) + Tracked Point Position Module',
    bytes: new Uint8Array([
      81, 0, 43, 4, 84, 101, 115, 116, 103, 213, 152, 27, 1, 6, 0, 30, 0, 100, 63, 240, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0,
      0, 0, 0, 0, 64, 8, 0, 0, 0, 0, 0, 0, 1,
    ]),
    expected: {
      type: 0x51,
      size: 43,
      nameLength: 4,
      name: 'Test',
      timestamp: 1742051355,
      numberOfModules: 1,
      modules: [
        {
          type: 0x06,
          size: 30,
          latency: 100,
          x: 1,
          y: 2,
          z: 3,
          index: 1,
        },
      ],
    },
    decoder: Decoders.Trackable,
  },
  {
    description: 'RTTrPM + Empty Trackable',
    bytes: new Uint8Array([
      65, 84, 67, 52, 0, 2, 0, 0, 0, 1, 0, 0, 27, 18, 52, 86, 120, 1, 1, 0, 9, 4, 84, 101, 115, 116, 0,
    ]),
    expected: {
      header: {
        intHeader: 0x4154,
        floatHeader: 0x4334,
        version: 2,
        packetID: 1,
        packetFormat: 0,
        size: 27,
        context: 0x12345678,
        subModuleCount: 1,
        isLittleEndian: false,
      },
      modules: [
        {
          type: 0x01,
          size: 9,
          nameLength: 4,
          name: 'Test',
          timestamp: undefined,
          numberOfModules: 0,
          modules: [],
        },
      ],
    },
    decoder: Decoders.RTTrPM,
  },
];

describe('RTTrPM Bytes Decoding', () => {
  goodTests.forEach((bytesTest) => {
    it(bytesTest.description, () => {
      const decoded = bytesTest.decoder(bytesTest.bytes);
      deepEqual(decoded, bytesTest.expected);
    });
  });
});

// TODO(jwetzell): add error tests
const badTests = [];
describe('RTTrPM Bytes Decoding Throws', () => {
  badTests.forEach((bytesTest) => {
    it(bytesTest.description, () => {
      throws(() => {
        bytesTest.decoder(bytesTest.bytes);
      }, bytesTest.throwsMessage);
    });
  });
});
