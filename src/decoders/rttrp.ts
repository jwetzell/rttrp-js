import { RTTrPHeader } from '../models';

export default (bytes: Uint8Array): RTTrPHeader => {
  if (bytes.length < 18) {
    throw new Error('RTTrP Header must be at least 18 bytes long');
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;

  let isLittleEndian = false;
  const intHeader = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  const floatHeader = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  const version = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  if (version !== 0x0002) {
    throw new Error('Only version 2 of the RTTrP header is currently supported');
  }
  if (intHeader === 0x5441) {
    isLittleEndian = true;
  }
  const packetID = view.getUint32(dataOffset, isLittleEndian);
  dataOffset += 4;

  const packetFormat = view.getUint8(dataOffset);
  dataOffset += 1;
  const size = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  const context = view.getUint32(dataOffset, isLittleEndian);
  dataOffset += 4;
  const subModuleCount = view.getUint8(dataOffset);
  dataOffset += 1;
  return {
    intHeader,
    floatHeader,
    version,
    packetID,
    packetFormat,
    size,
    context,
    subModuleCount,
  };
};
