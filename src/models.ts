export type RTTrPHeader = {
  intHeader?: number;
  floatHeader: number;
  version: number;
  packetID: number;
  packetFormat: number;
  size: number;
  context: number;
  subModuleCount: number;
};

export type CentroidPosition = {
  type: number;
  size: number;
  latency: number;
  x: number;
  y: number;
  z: number;
};

};
