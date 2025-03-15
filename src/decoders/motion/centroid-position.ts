import { CentroidPosition } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): CentroidPosition => {
  if (bytes.length !== 29) {
    throw new Error('Centroid Position module must be 29 bytes');
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  const type = view.getUint8(0);
  if (type !== 0x02) {
    throw new Error('Centroid Position module must have a type of 0x02');
  }

  const size = view.getUint16(1, isLittleEndian);
  if (size !== 29) {
    throw new Error('Centroid Position module must be 29 bytes');
  }
  const latency = view.getUint16(3, isLittleEndian);
  const x = view.getFloat64(5, isLittleEndian);
  const y = view.getFloat64(13, isLittleEndian);
  const z = view.getFloat64(21, isLittleEndian);
  return {
    type,
    size,
    latency,
    x,
    y,
    z,
  };
};
