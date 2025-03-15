export default (
  x: number,
  y: number,
  z: number,
  accelX: number,
  accelY: number,
  accelZ: number,
  velocityX: number,
  velocityY: number,
  velocityZ: number,
  index: number,
  isLittleEndian: boolean = false
): Uint8Array => {
  const bytes = new Uint8Array(52);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, 0x21);
  dataOffset += 1;
  view.setUint16(dataOffset, bytes.byteLength, isLittleEndian);
  dataOffset += 2;

  view.setFloat64(dataOffset, x, isLittleEndian);
  dataOffset += 8;
  view.setFloat64(dataOffset, y, isLittleEndian);
  dataOffset += 8;
  view.setFloat64(dataOffset, z, isLittleEndian);
  dataOffset += 8;

  view.setFloat32(dataOffset, accelX, isLittleEndian);
  dataOffset += 4;
  view.setFloat32(dataOffset, accelY, isLittleEndian);
  dataOffset += 4;
  view.setFloat32(dataOffset, accelZ, isLittleEndian);
  dataOffset += 4;

  view.setFloat32(dataOffset, velocityX, isLittleEndian);
  dataOffset += 4;
  view.setFloat32(dataOffset, velocityY, isLittleEndian);
  dataOffset += 4;
  view.setFloat32(dataOffset, velocityZ, isLittleEndian);
  dataOffset += 4;
  view.setUint8(dataOffset, index);

  return bytes;
};
