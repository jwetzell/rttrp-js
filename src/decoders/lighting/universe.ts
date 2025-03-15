import { Decoders } from '..';
import { Spot, Universe } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): Universe => {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  const type = view.getUint8(dataOffset);
  dataOffset += 1;
  if (type !== 0x09) {
    throw new Error('Universe module must have a type of 0x09');
  }

  const size = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  if (size !== bytes.byteLength) {
    throw new Error('Universe module size mismatch');
  }
  const id = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  const numberOfSpots = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;

  const spots: Spot[] = [];
  let spotOffset = dataOffset;

  for (let index = 0; index < numberOfSpots; index++) {
    const spotData = bytes.subarray(spotOffset);
    console.log(spotData);
    const spot = Decoders.Spot(spotData);
    spots.push(spot);
    spotOffset += spot.size;
  }
  return {
    type,
    size,
    id,
    numberOfSpots,
    spots,
  };
};
