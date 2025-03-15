import CentroidPosition from './motion/centroid-position';
import OrientationEuler from './motion/orientation-euler';
import OrientationQuaternion from './motion/orientation-quaternion';
import RTTrPHeader from './rttrp';

export const Decoders = {
  RTTrPHeader,
  CentroidPosition,
  OrientationQuaternion,
  OrientationEuler,
};
