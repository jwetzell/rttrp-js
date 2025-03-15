export default (
  latency: number,
  Qx: number,
  Qy: number,
  Qz: number,
  Qw: number,
  isLittleEndian: boolean = false
): Uint8Array => {
  const bytes = new Uint8Array(37);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, 0x03);
  dataOffset += 1;
  view.setUint16(dataOffset, bytes.byteLength, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, latency, isLittleEndian);
  dataOffset += 2;
  view.setFloat64(dataOffset, Qx, isLittleEndian);
  dataOffset += 8;
  view.setFloat64(dataOffset, Qy, isLittleEndian);
  dataOffset += 8;
  view.setFloat64(dataOffset, Qz, isLittleEndian);
  dataOffset += 8;
  view.setFloat64(dataOffset, Qw, isLittleEndian);
  return bytes;
};
