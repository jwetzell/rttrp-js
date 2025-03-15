import { Decoders } from '..';
import { LightingOutput, Universe } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): LightingOutput => {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  const type = view.getUint8(dataOffset);
  dataOffset += 1;
  if (type !== 0x07) {
    throw new Error('Lighting Output module must have a type of 0x09');
  }

  const size = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  if (size < bytes.byteLength) {
    throw new Error('Lighting Output module size mismatch');
  }
  const sequence = view.getUint32(dataOffset, isLittleEndian);
  dataOffset += 4;
  const action = view.getUint8(dataOffset);
  dataOffset += 1;
  const holdTime = view.getUint32(dataOffset, isLittleEndian);
  dataOffset += 4;
  const numberOfUniverses = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;

  const universes: Universe[] = [];
  let universeOffset = dataOffset;

  for (let index = 0; index < numberOfUniverses; index++) {
    const universeData = bytes.subarray(universeOffset);
    const universe = Decoders.Universe(universeData);
    universes.push(universe);
    universeOffset += universe.size;
  }
  return {
    type,
    size,
    sequence,
    action,
    holdTime,
    numberOfUniverses,
    universes,
  };
};
