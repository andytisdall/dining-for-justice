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
import {RestaurantStackParams} from './RestaurantNavigator';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';
import baseStyles from '../styles/baseStyles';

type MapScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantMap'
>;

const INITIAL_COORDS: Region = {
  latitude: 37.8,
  longitude: -122.25,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

const restaurantIcon = require('../../assets/restaurantIcon.png');

const Map = ({navigation, route}: MapScreenProps) => {
  const {id} = route.params;

  const [selectedRestaurant, setSelectedRestaurant] = useState(id);

  const {data: restaurants} = useGetRestaurantsQuery();

  const markerRef = useRef<MapMarker>(null);
  const mapRef = useRef<MapView>(null);

  const renderMarkers = () => {
    return restaurants
      ?.filter(r => r.coords?.latitude && r.coords.longitude)
      .map(restaurant => {
        if (restaurant.id === id) {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              description={restaurant.details.type}
              coordinate={{
                latitude: restaurant.coords!.latitude!,
                longitude: restaurant.coords!.longitude!,
              }}
              onPress={() => setSelectedRestaurant(restaurant.id)}
              ref={markerRef}
              image={restaurantIcon}
            />
          );
        }
        return (
          <Marker
            key={restaurant.name}
            title={restaurant.name}
            description={restaurant.details.type}
            coordinate={{
              latitude: restaurant.coords!.latitude!,
              longitude: restaurant.coords!.longitude!,
            }}
            onPress={() => setSelectedRestaurant(restaurant.id)}
            image={restaurantIcon}
          />
        );
      });
  };

  const restaurant = restaurants?.find(r => r.id === selectedRestaurant);

  return (
    <ScrollView contentContainerStyle={baseStyles.scrollView}>
      <View style={baseStyles.screen}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={mapStyles.map}
          initialRegion={INITIAL_COORDS}
          onMapLoaded={() => {
            if (markerRef.current && mapRef.current) {
              markerRef.current.showCallout();
              mapRef.current.animateToRegion({
                latitude: restaurant!.coords!.latitude!,
                longitude: restaurant!.coords!.longitude!,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              });
            }
          }}>
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
