export default (offset: number, fade: number, value: number, isLittleEndian: boolean = false): Uint8Array => {
  const bytes = new Uint8Array(5);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint16(dataOffset, offset, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, fade, isLittleEndian);
  dataOffset += 2;
  view.setUint8(dataOffset, value);

  return bytes;
};
