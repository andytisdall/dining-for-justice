import {Marker} from 'react-native-maps';

import mapStyles from './mapStyles';

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
      image={require('../../../assets/user_marker.png')}
    />
  );
};

export default UserMarker;
