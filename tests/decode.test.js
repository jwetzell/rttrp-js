const { deepEqual, throws } = require('assert');
const { describe, it } = require('node:test');
const { Decoders } = require('../dist/cjs');
const goodTests = [
  {
    description: 'RTTrP Header',
    bytes: new Uint8Array([
      0x41, 0x54, 0x43, 0x34, 0x00, 0x02, 0x12, 0x34, 0x56, 0x78, 0x00, 0x00, 0x12, 0x12, 0x34, 0x56, 0x78, 0x00,
    ]),
    expected: {
      intHeader: 0x4154,
      floatHeader: 0x4334,
      version: 2,
      packetID: 305419896,
      packetFormat: 0,
      size: 18,
      context: 305419896,
      subModuleCount: 0,
      isLittleEndian: false,
    },
    decoder: Decoders.RTTrPHeader,
  },
];

describe('RTTrP Bytes Decoding', () => {
  goodTests.forEach((bytesTest) => {
    it(bytesTest.description, () => {
      const decoded = bytesTest.decoder(bytesTest.bytes);
      deepEqual(decoded, bytesTest.expected);
    });
  });
});

// TODO(jwetzell): add error tests
const badTests = [];
describe('RTTrP Bytes Decoding Throws', () => {
  badTests.forEach((bytesTest) => {
    it(bytesTest.description, () => {
      throws(() => {
        bytesTest.decoder(bytesTest.bytes);
      }, bytesTest.throwsMessage);
    });
  });
});
