import { ChannelBlock } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): ChannelBlock => {
  if (bytes.length !== 5) {
    throw new Error('Channel Block module must be 5 bytes');
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  const offset = view.getUint16(0);

  const fade = view.getUint16(2, isLittleEndian);

  const value = view.getUint8(4);
  return {
    offset,
    fade,
    value,
  };
};
