const { deepEqual, throws } = require('assert');
const { describe, it } = require('node:test');
const { Encoders } = require('../');

const goodTests = [];

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
