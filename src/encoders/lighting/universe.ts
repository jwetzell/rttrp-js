export default (id: number, spotModules: Uint8Array[], isLittleEndian: boolean = false): Uint8Array => {
  let totalSpotModuleSize = 1 + 2 + 2 + 2;

  spotModules.forEach((spotModule) => {
    totalSpotModuleSize += spotModule.byteLength;
  });

  const bytes = new Uint8Array(totalSpotModuleSize);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, 0x09);
  dataOffset += 1;
  view.setUint16(dataOffset, bytes.byteLength, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, id, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, spotModules.length, isLittleEndian);
  dataOffset += 2;
  spotModules.forEach((spotModule) => {
    bytes.set(spotModule, dataOffset);
    dataOffset += spotModule.length;
  });
  return bytes;
};
