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


export type TrackedPointPosition = {
  type: number;
  size: number;
  latency: number;
  x: number;
  y: number;
  z: number;
  index: number;
};

export type OrientationQuaternion = {
  type: number;
  size: number;
  latency: number;
  Qx: number;
  Qy: number;
  Qz: number;
  Qw: number;
};

export type OrientationEuler = {
  type: number;
  size: number;
  latency: number;
  order: number;
  r1: number;
  r2: number;
  r3: number;
};
