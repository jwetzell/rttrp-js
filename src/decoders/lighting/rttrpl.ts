import { Decoders } from '..';
import { LightingOutput, RTTrPL } from '../../models';

export default (bytes: Uint8Array): RTTrPL => {
  if (bytes.byteLength < 18) {
    throw new Error('RTTrPL packet must be at least 18 bytes long');
  }
  const header = Decoders.RTTrPHeader(bytes.subarray(0, 18));

  if (bytes.byteLength !== header.size) {
    throw new Error('RTTrPL packet size mismatch');
  }

  const modules: LightingOutput[] = [];
  let packetModuleOffset = 18;

  for (let index = 0; index < header.subModuleCount; index++) {
    const moduleData = bytes.subarray(packetModuleOffset);
    const moduleType = moduleData[0];
    switch (moduleType) {
      case 0x07: {
        const module = Decoders.LightingOutput(moduleData, header.isLittleEndian);
        modules.push(module);
        packetModuleOffset += module.size;
        break;
      }
      default:
        console.error(`unknown RTTrPL submodule type: ${moduleType}`);
        break;
    }
  }

  return {
    header,
    modules,
  };
};
