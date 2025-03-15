const textEncoder = new TextEncoder();

export default (name: string): Uint8Array => {
  const totalZoneObjectModuleSize = 1 + 1 + name.length;
  const bytes = new Uint8Array(totalZoneObjectModuleSize);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, totalZoneObjectModuleSize);
  dataOffset += 1;
  view.setUint8(dataOffset, name.length);
  dataOffset += 1;

  const nameBytes = textEncoder.encode(name);
  nameBytes.forEach((byte) => {
    view.setUint8(dataOffset, byte);
    dataOffset += 1;
  });
  return bytes;
};
