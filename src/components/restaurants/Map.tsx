import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region, Marker} from 'react-native-maps';

import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';
import baseStyles from '../styles/baseStyles';

const INITIAL_COORDS: Region = {
  latitude: 37.8,
  longitude: -122.25,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

const Map = () => {
  const {data} = useGetRestaurantsQuery();

  const renderMarkers = () => {
    return data
      ?.filter(r => r.coords?.latitude && r.coords.longitude)
      .map(restaurant => {
        return (
          <Marker
            key={restaurant.name}
            title={restaurant.name}
            description={restaurant.details.primaryTypeDisplayName.text}
            coordinate={{
              latitude: restaurant.coords!.latitude!,
              longitude: restaurant.coords!.longitude!,
            }}
          />
        );
      });
  };

  return (
    <View style={baseStyles.screen}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={mapStyles.map}
        initialRegion={INITIAL_COORDS}>
        {renderMarkers()}
      </MapView>
    </View>
  );
};

export default Map;
