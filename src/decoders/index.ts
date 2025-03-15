import ChannelBlock from './lighting/channel-block';
import CentroidAccelVelocity from './motion/centroid-accel-velocity';
import CentroidPosition from './motion/centroid-position';
import OrientationEuler from './motion/orientation-euler';
import OrientationQuaternion from './motion/orientation-quaternion';
import RTTrPM from './motion/rttrpm';
import Trackable from './motion/trackable';
import TrackedPointAccelVelocity from './motion/tracked-point-accel-velocity';
import TrackedPointPosition from './motion/tracked-point-position';
import ZoneCollisionDetection from './motion/zone-collision-detection';
import ZoneObject from './motion/zone-object';
import RTTrPHeader from './rttrp-header';

export const Decoders = {
  RTTrPHeader,
  RTTrPM,
  Trackable,
  CentroidPosition,
  CentroidAccelVelocity,
  TrackedPointPosition,
  TrackedPointAccelVelocity,
  OrientationQuaternion,
  OrientationEuler,
  ZoneCollisionDetection,
  ZoneObject,
  ChannelBlock,
};
