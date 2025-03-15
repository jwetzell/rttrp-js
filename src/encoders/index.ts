import ChannelBlock from './lighting/channel-block';
import Spot from './lighting/spot';
import Universe from './lighting/universe';
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

export const Encoders = {
  RTTrPHeader,
  RTTrPM,
  Trackable,
  CentroidPosition,
  OrientationQuaternion,
  OrientationEuler,
  TrackedPointPosition,
  CentroidAccelVelocity,
  TrackedPointAccelVelocity,
  ZoneCollisionDetection,
  ZoneObject,
  Universe,
  Spot,
  ChannelBlock,
};
