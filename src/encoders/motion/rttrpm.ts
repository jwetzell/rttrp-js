import RTTrPHeader from '../rttrp-header';

export default (
  packetId: number,
  context: number,
  trackables: Uint8Array[],
  isLittleEndian: boolean = false
): Uint8Array => {
  let totalPacketSize = 18; //header size

  trackables.forEach((trackable) => {
    totalPacketSize += trackable.length;
  });
  const bytes = new Uint8Array(totalPacketSize);

  let dataOffset = 0;

  const headerBytes = RTTrPHeader(0x4334, 0x02, packetId, 0x00, context, trackables, isLittleEndian);

  bytes.set(headerBytes, dataOffset);
  dataOffset += headerBytes.length;
  trackables.forEach((trackable) => {
    bytes.set(trackable, dataOffset);
    dataOffset += trackable.length;
  });
  return bytes;
};
