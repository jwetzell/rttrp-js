import RTTrPHeader from '../rttrp-header';

export default (
  packetId: number,
  context: number,
  lightingOutputs: Uint8Array[],
  isLittleEndian: boolean = false
): Uint8Array => {
  let totalPacketSize = 18; //header size

  lightingOutputs.forEach((lightingOutput) => {
    totalPacketSize += lightingOutput.length;
  });
  const bytes = new Uint8Array(totalPacketSize);

  let dataOffset = 0;

  const headerBytes = RTTrPHeader(0x4434, 0x02, packetId, 0x00, context, lightingOutputs, isLittleEndian);

  bytes.set(headerBytes, dataOffset);
  dataOffset += headerBytes.length;
  lightingOutputs.forEach((lightingOutput) => {
    bytes.set(lightingOutput, dataOffset);
    dataOffset += lightingOutput.length;
  });
  return bytes;
};
