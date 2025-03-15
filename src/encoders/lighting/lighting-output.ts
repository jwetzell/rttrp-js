export default (
  sequence: number,
  action: number,
  holdTime: number,
  universeModules: Uint8Array[],
  isLittleEndian: boolean = false
): Uint8Array => {
  let totalLightingOutputModuleSize = 1 + 2 + 4 + 1 + 4 + 2;

  universeModules.forEach((universeModule) => {
    totalLightingOutputModuleSize += universeModule.byteLength;
  });

  const bytes = new Uint8Array(totalLightingOutputModuleSize);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, 0x07);
  dataOffset += 1;
  view.setUint16(dataOffset, bytes.byteLength, isLittleEndian);
  dataOffset += 2;
  view.setUint32(dataOffset, sequence, isLittleEndian);
  dataOffset += 4;
  view.setUint8(dataOffset, action);
  dataOffset += 1;
  view.setUint32(dataOffset, holdTime, isLittleEndian);
  dataOffset += 4;
  view.setUint16(dataOffset, universeModules.length, isLittleEndian);
  dataOffset += 2;

  universeModules.forEach((universeModule) => {
    bytes.set(universeModule, dataOffset);
    dataOffset += universeModule.length;
  });
  return bytes;
};
