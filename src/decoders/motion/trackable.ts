import { Decoders } from '..';
import { Trackable, TrackableModule } from '../../models';

const textDecoder = new TextDecoder('utf-8');

export default (bytes: Uint8Array, isLittleEndian: boolean = false): Trackable => {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let dataOffset = 0;
  const type = view.getUint8(0);
  dataOffset += 1;
  if (type !== 0x01 && type !== 0x51) {
    throw new Error('Trackable module must have a type of 0x01 or 0x51');
  }

  const size = view.getUint16(dataOffset, isLittleEndian);
  dataOffset += 2;
  if (size !== bytes.byteLength) {
    throw new Error('Trackable module size mismatch');
  }
  const nameLength = view.getUint8(dataOffset);
  dataOffset += 1;
  const name = textDecoder.decode(bytes.subarray(4, 4 + nameLength));
  dataOffset += nameLength;
  let timestamp;

  if (type === 0x51) {
    timestamp = view.getUint32(dataOffset, isLittleEndian);
    dataOffset += 4;
  }
  const numberOfModules = view.getUint8(dataOffset);
  dataOffset += 1;

  const modules: TrackableModule[] = [];
  let trackableModuleOffset = dataOffset;

  for (let index = 0; index < numberOfModules; index++) {
    const moduleData = bytes.subarray(trackableModuleOffset);
    const moduleType = moduleData[0];
    switch (moduleType) {
      case 0x02: {
        const module = Decoders.CentroidPosition(moduleData, isLittleEndian);
        modules.push(module);
        trackableModuleOffset += module.size;
        break;
      }
      case 0x03: {
        const module = Decoders.OrientationQuaternion(moduleData, isLittleEndian);
        modules.push(module);
        trackableModuleOffset += module.size;
        break;
      }
      case 0x04: {
        const module = Decoders.OrientationEuler(moduleData, isLittleEndian);
        modules.push(module);
        trackableModuleOffset += module.size;
        break;
      }
      case 0x06: {
        const module = Decoders.TrackedPointPosition(moduleData, isLittleEndian);
        modules.push(module);
        trackableModuleOffset += module.size;
        break;
      }
      case 0x20: {
        const module = Decoders.CentroidAccelVelocity(moduleData, isLittleEndian);
        modules.push(module);
        trackableModuleOffset += module.size;
        break;
      }
      case 0x21: {
        const module = Decoders.TrackedPointAccelVelocity(moduleData, isLittleEndian);
        modules.push(module);
        trackableModuleOffset += module.size;
        break;
      }
      case 0x22: {
        const module = Decoders.ZoneCollisionDetection(moduleData, isLittleEndian);
        modules.push(module);
        trackableModuleOffset += module.size;
        break;
      }
      default:
        console.error(`unknown trackable submodule type: ${moduleType}`);
        break;
    }
  }

  return {
    type,
    size,
    nameLength,
    name,
    timestamp,
    numberOfModules,
    modules,
  };
};
