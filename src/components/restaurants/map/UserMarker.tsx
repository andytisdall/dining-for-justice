import {Marker} from 'react-native-maps';

import mapStyles from './mapStyles';

const USER_MARKER = require('../../../assets/user_marker_ios.png');

const UserMarker = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return (
    <Marker
      coordinate={{latitude, longitude}}
      style={mapStyles.userMarker}
      image={USER_MARKER}
    />
  );
};

export default UserMarker;
