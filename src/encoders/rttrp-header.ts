const HEADER_SIZE = 18;

export default (
  floatSignature: number,
  version: number,
  packetID: number,
  packetFormat: number,
  context: number,
  subModules: Uint8Array[],
  isLittleEndian: boolean = false
): Uint8Array => {
  if (version !== 2) {
    throw new Error('Only version 2 of the RTTrP header is currently supported');
  }
  const bytes = new Uint8Array(HEADER_SIZE);

  let totalPacketSize = bytes.byteLength;
  subModules.forEach((subModule) => {
    totalPacketSize += subModule.length;
  });

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let dataOffset = 0;

  view.setUint16(dataOffset, 0x4154, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, floatSignature, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, version);
  dataOffset += 2;

  view.setUint32(dataOffset, packetID, isLittleEndian);
  dataOffset += 4;

  view.setUint8(dataOffset, packetFormat);
  dataOffset += 1;
  view.setUint16(dataOffset, totalPacketSize, isLittleEndian);
  dataOffset += 2;
  view.setUint32(dataOffset, context, isLittleEndian);
  dataOffset += 4;
  view.setUint8(dataOffset, subModules.length);
  dataOffset += 1;

  return bytes;
};
