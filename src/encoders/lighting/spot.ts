export default (
  id: number,
  offset: number,
  channelBlockModules: Uint8Array[],
  isLittleEndian: boolean = false
): Uint8Array => {
  let totalSpotModuleSize = 1 + 2 + 2 + 2 + 2;

  channelBlockModules.forEach((channelBlockModule) => {
    totalSpotModuleSize += channelBlockModule.byteLength;
  });

  const bytes = new Uint8Array(totalSpotModuleSize);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, 0x0a);
  dataOffset += 1;
  view.setUint16(dataOffset, bytes.byteLength, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, id, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, offset, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, channelBlockModules.length, isLittleEndian);
  dataOffset += 2;
  channelBlockModules.forEach((channelBlockModule) => {
    bytes.set(channelBlockModule, dataOffset);
    dataOffset += channelBlockModule.length;
  });
  return bytes;
};
