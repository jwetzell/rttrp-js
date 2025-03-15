export default (
  latency: number,
  order: number,
  R1: number,
  R2: number,
  R3: number,
  isLittleEndian: boolean = false
): Uint8Array => {
  const bytes = new Uint8Array(31);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, 0x04);
  dataOffset += 1;
  view.setUint16(dataOffset, bytes.byteLength, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, latency, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, order, isLittleEndian);
  dataOffset += 2;
  view.setFloat64(dataOffset, R1, isLittleEndian);
  dataOffset += 8;
  view.setFloat64(dataOffset, R2, isLittleEndian);
  dataOffset += 8;
  view.setFloat64(dataOffset, R3, isLittleEndian);
  return bytes;
};
