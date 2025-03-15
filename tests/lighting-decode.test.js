const { deepEqual, throws } = require('assert');
const { describe, it } = require('node:test');
const { Decoders } = require('../');
const goodTests = [
  {
    description: 'RTTrPL + Lighting Output + Universe + Spot + Single Channel Block',
    bytes: new Uint8Array([
      65, 84, 0x44, 0x34, 0, 2, 0, 0, 0, 1, 0, 0, 53, 18, 52, 86, 120, 1, 0x07, 0x00, 0x23, 0x00, 0x00, 0x00, 0x01,
      0x01, 0x00, 0x00, 0x00, 0x64, 0x00, 0x01, 0x09, 0x00, 0x15, 0x12, 0x34, 0x00, 0x01, 0x0a, 0x00, 0x0e, 0x12, 0x34,
      0x00, 0x01, 0x00, 0x01, 0x00, 0x08, 0x00, 0x06, 0x40,
    ]),
    expected: {
      header: {
        intHeader: 0x4154,
        floatHeader: 0x4434,
        version: 2,
        packetID: 1,
        packetFormat: 0,
        size: 53,
        context: 0x12345678,
        subModuleCount: 1,
        isLittleEndian: false,
      },
      modules: [
        {
          type: 0x07,
          size: 35,
          sequence: 1,
          action: 1,
          holdTime: 100,
          numberOfUniverses: 1,
          universes: [
            {
              type: 0x09,
              size: 21,
              id: 0x1234,
              numberOfSpots: 1,
              spots: [
                {
                  type: 0x0a,
                  size: 14,
                  id: 0x1234,
                  offset: 1,
                  numberOfChannelBlocks: 1,
                  channelBlocks: [
                    {
                      offset: 0x08,
                      fade: 0x06,
                      value: 0x40,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    decoder: Decoders.RTTrPL,
  },
  {
    description: 'Lighting Output + Universe + Spot + Single Channel Block',
    bytes: new Uint8Array([
      0x07, 0x00, 0x23, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x64, 0x00, 0x01, 0x09, 0x00, 0x15, 0x12, 0x34,
      0x00, 0x01, 0x0a, 0x00, 0x0e, 0x12, 0x34, 0x00, 0x01, 0x00, 0x01, 0x00, 0x08, 0x00, 0x06, 0x40,
    ]),
    expected: {
      type: 0x07,
      size: 35,
      sequence: 1,
      action: 1,
      holdTime: 100,
      numberOfUniverses: 1,
      universes: [
        {
          type: 0x09,
          size: 21,
          id: 0x1234,
          numberOfSpots: 1,
          spots: [
            {
              type: 0x0a,
              size: 14,
              id: 0x1234,
              offset: 1,
              numberOfChannelBlocks: 1,
              channelBlocks: [
                {
                  offset: 0x08,
                  fade: 0x06,
                  value: 0x40,
                },
              ],
            },
          ],
        },
      ],
    },
    decoder: Decoders.LightingOutput,
  },
  {
    description: 'Universe + Spot + Single Channel Block',
    bytes: new Uint8Array([
      0x09, 0x00, 0x15, 0x12, 0x34, 0x00, 0x01, 0x0a, 0x00, 0x0e, 0x12, 0x34, 0x00, 0x01, 0x00, 0x01, 0x00, 0x08, 0x00,
      0x06, 0x40,
    ]),
    expected: {
      type: 0x09,
      size: 21,
      id: 0x1234,
      numberOfSpots: 1,
      spots: [
        {
          type: 0x0a,
          size: 14,
          id: 0x1234,
          offset: 1,
          numberOfChannelBlocks: 1,
          channelBlocks: [
            {
              offset: 0x08,
              fade: 0x06,
              value: 0x40,
            },
          ],
        },
      ],
    },
    decoder: Decoders.Universe,
  },
  {
    description: 'Spot + Single Channel Block',
    bytes: new Uint8Array([0x0a, 0x00, 0x0e, 0x12, 0x34, 0x00, 0x01, 0x00, 0x01, 0x00, 0x08, 0x00, 0x06, 0x40]),
    expected: {
      type: 0x0a,
      size: 14,
      id: 0x1234,
      offset: 1,
      numberOfChannelBlocks: 1,
      channelBlocks: [
        {
          offset: 0x08,
          fade: 0x06,
          value: 0x40,
        },
      ],
    },
    decoder: Decoders.Spot,
  },
  {
    description: 'Channel Block',
    bytes: new Uint8Array([0x00, 0x08, 0x00, 0x06, 0x40]),
    expected: {
      offset: 0x08,
      fade: 0x06,
      value: 0x40,
    },
    decoder: Decoders.ChannelBlock,
  },
];

describe('RTTrPL Bytes Decoding', () => {
  goodTests.forEach((bytesTest) => {
    it(bytesTest.description, () => {
      const decoded = bytesTest.decoder(bytesTest.bytes);
      deepEqual(decoded, bytesTest.expected);
    });
  });
});

// TODO(jwetzell): add error tests
const badTests = [];
describe('RTTrPL Bytes Decoding Throws', () => {
  badTests.forEach((bytesTest) => {
    it(bytesTest.description, () => {
      throws(() => {
        bytesTest.decoder(bytesTest.bytes);
      }, bytesTest.throwsMessage);
    });
  });
});
