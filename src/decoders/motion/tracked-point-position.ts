import { TrackedPointPosition } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): TrackedPointPosition => {
  if (bytes.length !== 30) {
    throw new Error('Tracked Point Position module must be 30 bytes');
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  const type = view.getUint8(0);
  if (type !== 0x06) {
    throw new Error('Tracked Point Position module must have a type of 0x06');
  }

  const size = view.getUint16(1, isLittleEndian);
  if (size !== 30) {
    throw new Error('Tracked Point Position module must be 30 bytes');
  }
  const latency = view.getUint16(3, isLittleEndian);
  const x = view.getFloat64(5, isLittleEndian);
  const y = view.getFloat64(13, isLittleEndian);
  const z = view.getFloat64(21, isLittleEndian);
  const index = view.getUint8(29);
  return {
    type,
    size,
    latency,
    x,
    y,
    z,
    index,
  };
};
