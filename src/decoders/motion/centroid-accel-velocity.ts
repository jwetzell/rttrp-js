import { CentroidAccelVelocity } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): CentroidAccelVelocity => {
  if (bytes.length !== 51) {
    throw new Error('Centroid Acceleration and Velocity module must be 51 bytes');
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  const type = view.getUint8(0);
  if (type !== 0x20) {
    throw new Error('Centroid Acceleration and Velocity module must have a type of 0x20');
  }

  const size = view.getUint16(1, isLittleEndian);
  if (size !== 51) {
    throw new Error('Centroid Acceleration and Velocity module must be 51 bytes');
  }
  const x = view.getFloat64(3, isLittleEndian);
  const y = view.getFloat64(11, isLittleEndian);
  const z = view.getFloat64(19, isLittleEndian);

  const accelX = view.getFloat32(27, isLittleEndian);
  const accelY = view.getFloat32(31, isLittleEndian);
  const accelZ = view.getFloat32(35, isLittleEndian);

  const velocityX = view.getFloat32(39, isLittleEndian);
  const velocityY = view.getFloat32(43, isLittleEndian);
  const velocityZ = view.getFloat32(47, isLittleEndian);

  return {
    type,
    size,
    x,
    y,
    z,
    accelX,
    accelY,
    accelZ,
    velocityX,
    velocityY,
    velocityZ,
  };
};
