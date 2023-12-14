import {View, ScrollView, Text} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  Marker,
  MapMarker,
  Callout,
} from 'react-native-maps';
import {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import useFilter from '../../../hooks/useFilter';
import Btn from '../../reusable/Btn';
import MapText from './MapText';
import {RestaurantStackParams} from '../RestaurantNavigator';
import {
  useGetRestaurantsQuery,
  Restaurant,
} from '../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';
import baseStyles from '../../styles/baseStyles';
import restaurantStyles from '../restaurantStyles';

type MapScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantMap'
>;

const ZOOM_VALUE = 0.04;

const INITIAL_COORDS: Region = {
  latitude: 37.81,
  longitude: -122.233,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const Map = ({navigation, route}: MapScreenProps) => {
  const {id} = route.params;

  const [selectedRestaurant, setSelectedRestaurant] = useState(id);

  const {data: restaurants} = useGetRestaurantsQuery();

  const [sortedRestaurants, filterComponent] = useFilter(restaurants);

  const markerRef = useRef<MapMarker>(null);
  const mapRef = useRef<MapView>(null);
  const initialLoadRef = useRef(false);
  const zoomRef = useRef(INITIAL_COORDS.latitudeDelta);

  const VERTICAL_OFFSET = zoomRef.current > 0.035 ? 0.01 : 0;

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
    return sortedRestaurants
      ?.filter(r => r.coords)
      .map(restaurant => {
        const ref = restaurant.id === id ? markerRef : undefined;
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
            ref={ref}>
            <Callout
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  id: restaurant.id,
                })
              }>
              <View>
                <MapText restaurant={restaurant} />
              </View>
            </Callout>
          </Marker>
        );
      });
  };

  const restaurant = sortedRestaurants?.find(r => r.id === selectedRestaurant);

  const centerMarker = (rest: Restaurant) => {
    if (mapRef.current && rest.coords) {
      if (zoomRef.current > ZOOM_VALUE) {
        mapRef.current.animateToRegion({
          latitude: rest.coords.latitude + VERTICAL_OFFSET,
          longitude: rest.coords.longitude,
          latitudeDelta: ZOOM_VALUE,
          longitudeDelta: ZOOM_VALUE,
        });
      } else {
        mapRef.current.animateToRegion({
          latitude: rest.coords.latitude + VERTICAL_OFFSET,
          longitude: rest.coords.longitude,
          latitudeDelta: zoomRef.current,
          longitudeDelta: zoomRef.current,
        });
      }
    }
  };

  const syncZoomRef = (region: Region) => {
    zoomRef.current = region.latitudeDelta;
  };

  return (
    <ScrollView contentContainerStyle={baseStyles.scrollView}>
      <View style={[baseStyles.screen]}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={mapStyles.map}
          initialRegion={INITIAL_COORDS}
          onMapLoaded={onMapLoaded}
          onRegionChangeComplete={syncZoomRef}>
          {renderMarkers()}
        </MapView>
        <View style={restaurantStyles.listHeader}>
          {filterComponent}
          <Btn
            style={mapStyles.resetBtn}
            onPress={() => mapRef.current?.animateToRegion(INITIAL_COORDS)}>
            <Text style={baseStyles.btnText}>Reset Map</Text>
          </Btn>
        </View>
      </View>
    </ScrollView>
  );
};

export default Map;
