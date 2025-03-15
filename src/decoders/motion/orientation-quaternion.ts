import { OrientationQuaternion } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): OrientationQuaternion => {
  if (bytes.length !== 37) {
    throw new Error('Orientation (Quaternion) module must be 37 bytes');
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  const type = view.getUint8(0);
  if (type !== 0x03) {
    throw new Error('Orientation (Quaternion) module must have a type of 0x03');
  }

  const size = view.getUint16(1, isLittleEndian);
  if (size !== 37) {
    throw new Error('Orientation (Quaternion) module must be 37 bytes');
  }
  const latency = view.getUint16(3, isLittleEndian);
  const Qx = view.getFloat64(5, isLittleEndian);
  const Qy = view.getFloat64(13, isLittleEndian);
  const Qz = view.getFloat64(21, isLittleEndian);
  const Qw = view.getFloat64(29, isLittleEndian);
  return {
    type,
    size,
    latency,
    Qx,
    Qy,
    Qz,
    Qw,
  };
};
