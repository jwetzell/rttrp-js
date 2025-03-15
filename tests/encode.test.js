const { deepEqual, throws } = require('assert');
const { describe, it } = require('node:test');
const { Encoders } = require('../dist/cjs/index');

const goodTests = [
  {
    description: 'RTTrP Header',
    expected: new Uint8Array([
      0x41, 0x54, 0x43, 0x34, 0x00, 0x02, 0x12, 0x34, 0x56, 0x78, 0x00, 0x00, 0x12, 0x12, 0x34, 0x56, 0x78, 0x00,
    ]),
    bytes: () => {
      return Encoders.RTTrPHeader(0x4334, 2, 0x12345678, 0, 0x12345678, [], false);
    },
  },
  },
];

describe('RTTrP Message Encoding', () => {
  goodTests.forEach((messageTest) => {
    it(messageTest.description, () => {
      const actual = messageTest.bytes();
      deepEqual(actual, messageTest.expected);
    });
  });
});

//TODO(jwetzell): add tests that handle errors
const badTests = [];

describe('RTTrP Message Encoding Throws', () => {
  badTests.forEach((messageTest) => {
    it(messageTest.description, () => {
      messageTest.bytes();
      throws(() => {}, messageTest.throwsMessage);
    });
  });
});
