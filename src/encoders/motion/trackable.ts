const textEncoder = new TextEncoder();

export default (
  name: string,
  subModules: Uint8Array[],
  timestamp?: number,
  isLittleEndian: boolean = false
): Uint8Array => {
  let totalTrackableSize = 1 + 2 + 1 + name.length + 1;
  let type = 0x01;
  if (timestamp !== undefined) {
    totalTrackableSize += 4;
    type = 0x51;
  }
  subModules.forEach((subModule) => {
    totalTrackableSize += subModule.length;
  });
  const bytes = new Uint8Array(totalTrackableSize);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  view.setUint8(dataOffset, type);
  dataOffset += 1;
  view.setUint16(dataOffset, totalTrackableSize, isLittleEndian);
  dataOffset += 2;
  const nameBytes = textEncoder.encode(name);
  view.setUint8(dataOffset, nameBytes.length);
  dataOffset += 1;

  nameBytes.forEach((byte) => {
    view.setUint8(dataOffset, byte);
    dataOffset += 1;
  });

  if (timestamp !== undefined) {
    view.setUint32(dataOffset, timestamp, isLittleEndian);
    dataOffset += 4;
  }

  view.setUint8(dataOffset, subModules.length);
  dataOffset += 1;
  subModules.forEach((subModule) => {
    bytes.set(subModule, dataOffset);
    dataOffset += subModule.length;
  });
  return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
};
