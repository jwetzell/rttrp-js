import { ZoneObject } from '../../models';
const textDecoder = new TextDecoder('utf-8');
export default (bytes: Uint8Array): ZoneObject => {
  const size = bytes[0];
  if (bytes.byteLength < size) {
    throw new Error('Zone Object size does not have enough actual bytes');
  }

  const moduleBytes = bytes.subarray(0, size);

  const nameLength = moduleBytes[1];
  if (moduleBytes.byteLength - 2 !== nameLength) {
    throw new Error('Zone Object name length does not match actual moduleBytes length');
  }
  const name = textDecoder.decode(moduleBytes.subarray(2));
  return {
    size,
    nameLength,
    name,
  };
};
