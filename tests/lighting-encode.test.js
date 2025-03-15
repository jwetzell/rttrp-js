const { deepEqual, throws } = require('assert');
const { describe, it } = require('node:test');
const { Encoders } = require('../');

const goodTests = [
  {
    description: 'Universe + Spot + Single Channel Block',
    expected: new Uint8Array([
      0x09, 0x00, 0x15, 0x12, 0x34, 0x00, 0x01, 0x0a, 0x00, 0x0e, 0x12, 0x34, 0x00, 0x01, 0x00, 0x01, 0x00, 0x08, 0x00,
      0x06, 0x40,
    ]),
    bytes: () => {
      return Encoders.Universe(0x1234, [Encoders.Spot(0x1234, 1, [Encoders.ChannelBlock(8, 6, 64)])]);
    },
  },
  {
    description: 'Spot + Single Channel Block',
    expected: new Uint8Array([0x0a, 0x00, 0x0e, 0x12, 0x34, 0x00, 0x01, 0x00, 0x01, 0x00, 0x08, 0x00, 0x06, 0x40]),
    bytes: () => {
      return Encoders.Spot(0x1234, 1, [Encoders.ChannelBlock(8, 6, 64)]);
    },
  },
  {
    description: 'Channel Block',
    expected: new Uint8Array([0x00, 0x08, 0x00, 0x06, 0x40]),
    bytes: () => {
      return Encoders.ChannelBlock(8, 6, 64);
    },
  },
];

describe('RTTrPL Message Encoding', () => {
  goodTests.forEach((messageTest) => {
    it(messageTest.description, () => {
      const actual = messageTest.bytes();
      deepEqual(actual, messageTest.expected);
    });
  });
});

//TODO(jwetzell): add tests that handle errors
const badTests = [];

describe('RTTrPL Message Encoding Throws', () => {
  badTests.forEach((messageTest) => {
    it(messageTest.description, () => {
      messageTest.bytes();
      throws(() => {}, messageTest.throwsMessage);
    });
  });
});
