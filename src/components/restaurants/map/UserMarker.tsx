import {Image, View} from 'react-native';
import {Marker} from 'react-native-maps';

import mapStyles from './mapStyles';

const personIcon = require('../../../assets/person-icon.png');

const UserMarker = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return (
    <Marker coordinate={{latitude, longitude}} icon={personIcon}>
      <View style={mapStyles.userMarker}>
        <Image source={personIcon} style={mapStyles.image} />
      </View>
    </Marker>
  );
};

export default UserMarker;
