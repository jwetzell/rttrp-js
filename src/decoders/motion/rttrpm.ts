import { Decoders } from '..';
import { RTTrPM, Trackable } from '../../models';

export default (bytes: Uint8Array): RTTrPM => {
  if (bytes.byteLength < 18) {
    throw new Error('RTTrPM packet must be at least 18 bytes long');
  }
  const header = Decoders.RTTrPHeader(bytes.subarray(0, 18));

  if (bytes.byteLength !== header.size) {
    throw new Error('RTTrPM packet size mismatch');
  }

  const modules: Trackable[] = [];
  let packetModuleOffset = 18;

  for (let index = 0; index < header.subModuleCount; index++) {
    const moduleData = bytes.subarray(packetModuleOffset);
    const moduleType = moduleData[0];
    switch (moduleType) {
      case 0x01:
      case 0x51: {
        const module = Decoders.Trackable(moduleData, header.isLittleEndian);
        modules.push(module);
        packetModuleOffset += module.size;
        break;
      }
      default:
        console.error(`unknown RTTrPM submodule type: ${moduleType}`);
        break;
    }
  }

  return {
    header,
    modules,
  };
};
