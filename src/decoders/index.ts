import CentroidPosition from './motion/centroid-position';
import OrientationEuler from './motion/orientation-euler';
import OrientationQuaternion from './motion/orientation-quaternion';
import TrackedPointPosition from './motion/tracked-point-position';
import RTTrPHeader from './rttrp';

export const Decoders = {
  RTTrPHeader,
  CentroidPosition,
  TrackedPointPosition,
  OrientationQuaternion,
  OrientationEuler,
};
