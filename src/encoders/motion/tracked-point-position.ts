export default (
  latency: number,
  x: number,
  y: number,
  z: number,
  index: number,
  isLittleEndian: boolean = false
): Uint8Array => {
  const bytes = new Uint8Array(30);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, 0x06);
  dataOffset += 1;
  view.setUint16(dataOffset, bytes.byteLength, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, latency, isLittleEndian);
  dataOffset += 2;
  view.setFloat64(dataOffset, x, isLittleEndian);
  dataOffset += 8;
  view.setFloat64(dataOffset, y, isLittleEndian);
  dataOffset += 8;
  view.setFloat64(dataOffset, z, isLittleEndian);
  dataOffset += 8;
  view.setUint8(dataOffset, index);

  return bytes;
};
