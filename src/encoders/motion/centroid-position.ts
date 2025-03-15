export default (latency: number, x: number, y: number, z: number, isLittleEndian: boolean = false): Uint8Array => {
  const bytes = new Uint8Array(29);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, 0x02);
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
  return bytes;
};
