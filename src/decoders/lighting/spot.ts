import { Decoders } from '..';
import { ChannelBlock, Spot } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): Spot => {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  const type = view.getUint8(dataOffset);
  dataOffset += 1;
  if (type !== 0x0a) {
    throw new Error('Spot module must have a type of 0x0a');
  }

  const size = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  if (size < bytes.byteLength) {
    throw new Error('Spot module size mismatch');
  }
  const id = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  const offset = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  const numberOfChannelBlocks = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;

  const channelBlocks: ChannelBlock[] = [];
  let zoneObjectOffset = dataOffset;

  for (let index = 0; index < numberOfChannelBlocks; index++) {
    const channelBlockData = bytes.subarray(zoneObjectOffset, zoneObjectOffset + 5);
    const channelBlock = Decoders.ChannelBlock(channelBlockData);
    channelBlocks.push(channelBlock);
    zoneObjectOffset += channelBlockData.byteLength;
  }
  return {
    type,
    size,
    id,
    offset,
    numberOfChannelBlocks,
    channelBlocks,
  };
};
