import {View, Text} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  Marker,
  MapMarker,
} from 'react-native-maps';
import {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Btn from '../reusable/Btn';
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
  const [coordinates, setCoordinates] = useState({
    x: INITIAL_COORDS.latitude,
    y: INITIAL_COORDS.longitude,
    xDelta: INITIAL_COORDS.latitudeDelta,
    yDelta: INITIAL_COORDS.longitudeDelta,
  });

  const {data: restaurants} = useGetRestaurantsQuery();

  const ref = useRef<MapMarker>(null);

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
              ref={ref}
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
    <View style={baseStyles.screen}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={mapStyles.map}
        initialRegion={INITIAL_COORDS}
        region={{
          latitude: coordinates.x,
          longitude: coordinates.y,
          latitudeDelta: coordinates.xDelta,
          longitudeDelta: coordinates.yDelta,
        }}
        onMapLoaded={() => {
          if (ref.current) {
            ref.current.showCallout();
            setCoordinates({
              ...coordinates,
              x: restaurant!.coords!.latitude!,
              y: restaurant!.coords!.longitude!,
              xDelta: 0.05,
              yDelta: 0.05,
            });
          }
        }}>
        {renderMarkers()}
      </MapView>
      {!!restaurant && (
        <View style={baseStyles.centerSection}>
          <Text style={baseStyles.title}>{restaurant.name}</Text>
          <Btn
            onPress={() =>
              navigation.navigate('RestaurantDetail', {
                id: selectedRestaurant,
              })
            }>
            <Text>See Restaurant Details</Text>
          </Btn>
        </View>
      )}
    </View>
  );
};

export default Map;
