import { Decoders } from '..';
import { ZoneCollisionDetection, ZoneObject } from '../../models';

export default (bytes: Uint8Array, isLittleEndian: boolean = false): ZoneCollisionDetection => {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  const type = view.getUint8(0);
  if (type !== 0x22) {
    throw new Error('Zone Collision Detection module must have a type of 0x22');
  }

  const size = view.getUint16(1, isLittleEndian);
  if (size !== bytes.byteLength) {
    throw new Error('Zone Collision Detection module size mismatch');
  }
  const numberOfZones = view.getUint8(3);

  const zones: ZoneObject[] = [];
  let zoneObjectOffset = 4;

  for (let index = 0; index < numberOfZones; index++) {
    const zone = Decoders.ZoneObject(bytes.subarray(zoneObjectOffset));
    zones.push(zone);
    zoneObjectOffset += zone.size;
  }
  return {
    type,
    size,
    numberOfZones,
    zones,
  };
};
