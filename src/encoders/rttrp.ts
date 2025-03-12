import { RTTrPHeader } from '../models';

export default (header: RTTrPHeader): Uint8Array => {
  if (header.version !== 2) {
    throw new Error('Only version 2 of the RTTrP header is currently supported');
  }
  const bytes = new Uint8Array(18 + header.data.length);
  bytes.set(header.data, 18);

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let dataOffset = 0;

  let isLittleEndian = false;
  view.setUint16(dataOffset, header.intHeader, isLittleEndian);
  dataOffset += 2;
  view.setUint16(dataOffset, header.fltHeader, isLittleEndian);
  dataOffset += 2;
  if (header.intHeader === 0x4154) {
    isLittleEndian = false;
  }
  view.setUint16(dataOffset, header.version, isLittleEndian);
  dataOffset += 2;

  view.setUint32(dataOffset, header.pID, isLittleEndian);
  dataOffset += 4;

  view.setUint8(dataOffset, header.pForm);
  dataOffset += 1;
  view.setUint16(dataOffset, header.pktSize, isLittleEndian);
  dataOffset += 2;
  view.setUint32(dataOffset, header.context, isLittleEndian);
  dataOffset += 4;
  view.setUint8(dataOffset, header.numMods);
  dataOffset += 1;

  return bytes;
};
