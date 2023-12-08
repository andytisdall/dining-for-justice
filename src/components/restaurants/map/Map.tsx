import {View, ScrollView} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  Marker,
  MapMarker,
} from 'react-native-maps';
import {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import MapText from './MapText';
import {RestaurantStackParams} from '../RestaurantNavigator';
import {
  useGetRestaurantsQuery,
  Restaurant,
} from '../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';
import baseStyles from '../../styles/baseStyles';

type MapScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantMap'
>;

const INITIAL_COORDS: Region = {
  latitude: 37.8,
  longitude: -122.25,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

const Map = ({navigation, route}: MapScreenProps) => {
  const {id} = route.params;

  const [selectedRestaurant, setSelectedRestaurant] = useState(id);

  const {data: restaurants} = useGetRestaurantsQuery();
  1;

  const markerRef = useRef<MapMarker>(null);
  const mapRef = useRef<MapView>(null);
  const initialLoadRef = useRef(false);

  const onMapLoaded = () => {
    if (
      !initialLoadRef.current &&
      markerRef.current &&
      mapRef.current &&
      restaurant
    ) {
      markerRef.current.showCallout();
      centerMarker(restaurant);
      initialLoadRef.current = true;
    }
  };

  const renderMarkers = () => {
    return restaurants
      ?.filter(r => r.coords)
      .map(restaurant => {
        if (restaurant.id === id) {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              description={restaurant.cuisine}
              coordinate={{
                latitude: restaurant.coords!.latitude,
                longitude: restaurant.coords!.longitude,
              }}
              onPress={() => setSelectedRestaurant(restaurant.id)}
              ref={markerRef}
            />
          );
        }
        return (
          <Marker
            key={restaurant.name}
            title={restaurant.name}
            description={restaurant.cuisine}
            coordinate={{
              latitude: restaurant.coords!.latitude,
              longitude: restaurant.coords!.longitude,
            }}
            onPress={() => {
              setSelectedRestaurant(restaurant.id);
              centerMarker(restaurant);
            }}
          />
        );
      });
  };

  const restaurant = restaurants?.find(r => r.id === selectedRestaurant);

  const centerMarker = (rest: Restaurant) => {
    if (mapRef.current && rest.coords) {
      mapRef.current.animateToRegion({
        latitude: rest.coords.latitude,
        longitude: rest.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={baseStyles.screen}>
      <View style={baseStyles.screen}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={mapStyles.map}
          initialRegion={INITIAL_COORDS}
          onMapLoaded={onMapLoaded}>
          {renderMarkers()}
        </MapView>
        {!!restaurant && (
          <MapText
            restaurant={restaurant}
            navigate={() =>
              navigation.navigate('RestaurantDetail', {
                id: restaurant.id,
              })
            }
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Map;
