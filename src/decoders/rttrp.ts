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
  const fltHeader = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  if (intHeader === 0x4154) {
    isLittleEndian = false;
  }
  const version = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  if (version !== 0x0002) {
    throw new Error('Only version 2 of the RTTrP header is currently supported');
  }
  const pID = view.getUint32(dataOffset, isLittleEndian);
  dataOffset += 4;

  const pForm = view.getUint8(dataOffset);
  dataOffset += 1;
  const pktSize = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  const context = view.getUint32(dataOffset, isLittleEndian);
  dataOffset += 4;
  const numMods = view.getUint8(dataOffset);
  dataOffset += 1;
  const data = bytes.slice(dataOffset);
  return {
    intHeader,
    fltHeader,
    version,
    pID,
    pForm,
    pktSize,
    context,
    numMods,
    data,
  };
};
