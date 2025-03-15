export default (zoneObjectModules: Uint8Array[], isLittleEndian: boolean = false): Uint8Array => {
  let totalZoneModuleSize = 1 + 2 + 1;

  zoneObjectModules.forEach((zoneObjectModule) => {
    totalZoneModuleSize += zoneObjectModule.byteLength;
  });

  const bytes = new Uint8Array(totalZoneModuleSize);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, 0x22);
  dataOffset += 1;
  view.setUint16(dataOffset, bytes.byteLength, isLittleEndian);
  dataOffset += 2;
  view.setUint8(dataOffset, zoneObjectModules.length);
  dataOffset += 1;
  zoneObjectModules.forEach((zoneObjectModule) => {
    bytes.set(zoneObjectModule, dataOffset);
    dataOffset += zoneObjectModule.length;
  });
  return bytes;
};
