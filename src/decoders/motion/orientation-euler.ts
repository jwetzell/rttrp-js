import { OrientationEuler } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): OrientationEuler => {
  if (bytes.length !== 31) {
    throw new Error('Orientation (Euler) module must be 31 bytes');
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  const type = view.getUint8(0);
  if (type !== 0x04) {
    throw new Error('Orientation (Euler) module must have a type of 0x04');
  }

  const size = view.getUint16(1, isLittleEndian);
  if (size !== 31) {
    throw new Error('Orientation (Euler) module must be 31 bytes');
  }
  const latency = view.getUint16(3, isLittleEndian);
  const order = view.getUint16(5, isLittleEndian);
  const r1 = view.getFloat64(7, isLittleEndian);
  const r2 = view.getFloat64(15, isLittleEndian);
  const r3 = view.getFloat64(23, isLittleEndian);
  return {
    type,
    size,
    latency,
    order,
    r1,
    r2,
    r3,
  };
};
