export type RTTrPHeader = {
  intHeader: number;
  floatHeader: number;
  version: number;
  packetID: number;
  packetFormat: number;
  size: number;
  context: number;
  subModuleCount: number;
  isLittleEndian: boolean;
};

export type RTTrPM = {
  header: RTTrPHeader;
  modules: Trackable[];
};

export type RTTrPL = {
  header: RTTrPHeader;
  modules: LightingOutput[];
};

export type TrackableModule =
  | CentroidPosition
  | CentroidAccelVelocity
  | TrackedPointPosition
  | TrackedPointAccelVelocity
  | OrientationEuler
  | OrientationQuaternion
  | ZoneCollisionDetection;

export type Trackable = {
  type: number;
  size: number;
  nameLength: number;
  name: string;
  timestamp?: number;
  numberOfModules: number;
  modules: TrackableModule[];
};

export type CentroidPosition = {
  type: number;
  size: number;
  latency: number;
  x: number;
  y: number;
  z: number;
};

export type CentroidAccelVelocity = {
  type: number;
  size: number;
  x: number;
  y: number;
  z: number;
  accelX: number;
  accelY: number;
  accelZ: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
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

export type TrackedPointAccelVelocity = {
  type: number;
  size: number;
  x: number;
  y: number;
  z: number;
  accelX: number;
  accelY: number;
  accelZ: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
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

export type ZoneCollisionDetection = {
  type: number;
  size: number;
  numberOfZones: number;
  zones: ZoneObject[];
};

export type ZoneObject = {
  size: number;
  nameLength: number;
  name: string;
};

export type LightingOutput = {
  type: number;
  size: number;
  sequence: number;
  action: number;
  holdTime: number;
  numberOfUniverses: number;
  universes: Universe[];
};

export type Universe = {
  type: number;
  size: number;
  id: number;
  numberOfSpots: number;
  spots: Spot[];
};

export type Spot = {
  type: number;
  size: number;
  id: number;
  offset: number;
  numberOfChannelBlocks: number;
  channelBlocks: ChannelBlock[];
};

export type ChannelBlock = {
  offset: number;
  fade: number;
  value: number;
};
