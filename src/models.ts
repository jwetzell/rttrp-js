export type RTTrPHeader = {
  intHeader: number;
  fltHeader: number;
  version: number;
  pID: number;
  pForm: number;
  pktSize: number;
  context: number;
  numMods: number;
  data: Uint8Array;
};
