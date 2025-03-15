import CentroidAccelVelocity from './motion/centroid-accel-velocity';
import CentroidPosition from './motion/centroid-position';
import OrientationEuler from './motion/orientation-euler';
import OrientationQuaternion from './motion/orientation-quaternion';
import TrackedPointAccelVelocity from './motion/tracked-point-accel-velocity';
import TrackedPointPosition from './motion/tracked-point-position';
import ZoneCollisionDetection from './motion/zone-collision-detection';
import ZoneObject from './motion/zone-object';
import RTTrPHeader from './rttrp';

export const Decoders = {
  RTTrPHeader,
  CentroidPosition,
  CentroidAccelVelocity,
  TrackedPointPosition,
  TrackedPointAccelVelocity,
  OrientationQuaternion,
  OrientationEuler,
  ZoneCollisionDetection,
  ZoneObject,
};
