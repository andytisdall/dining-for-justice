import { Marker } from 'react-native-maps';

import mapStyles from '../mapStyles';

// const USER_MARKER = require('./user_marker.png');

const UserMarker = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return (
    <Marker
      coordinate={{ latitude, longitude }}
      style={mapStyles.userMarker}
      // icon={USER_MARKER}
      pinColor="blue"
    />
  );
};

export default UserMarker;
