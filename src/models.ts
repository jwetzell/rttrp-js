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
};
