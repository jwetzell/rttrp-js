const { deepEqual, throws } = require('assert');
const { describe, it } = require('node:test');
const { Encoders } = require('../dist/cjs/index');

const goodTests = [
  {
    description: 'RTTrP Header',
    expected: new Uint8Array([
      0x41, 0x54, 0x43, 0x34, 0x00, 0x02, 0x12, 0x34, 0x56, 0x78, 0x00, 0x00, 0x12, 0x12, 0x34, 0x56, 0x78, 0x00,
    ]),
    message: {
      intHeader: 0x4154,
      fltHeader: 0x4334,
      version: 2,
      pID: 305419896,
      pForm: 0,
      pktSize: 18,
      context: 305419896,
      numMods: 0,
      data: new Uint8Array(),
    },
    encoder: Encoders.RTTrPHeader,
  },
];

describe('RTTrP Message Encoding', () => {
  goodTests.forEach((messageTest) => {
    it(messageTest.description, () => {
      const actual = messageTest.encoder(messageTest.message);
      deepEqual(actual, messageTest.expected);
    });
  });
});

//TODO(jwetzell): add tests that handle errors
const badTests = [];

describe('RTTrP Message Encoding Throws', () => {
  badTests.forEach((messageTest) => {
    it(messageTest.description, () => {
      messageTest.encoder(messageTest.packet);
      throws(() => {}, messageTest.throwsMessage);
    });
  });
});
