import {View, ScrollView, Text} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  MapMarker,
  Marker,
  Callout,
  // Circle,
} from 'react-native-maps';
import {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import useFilter from '../../../hooks/useFilter';
import Btn from '../../reusable/Btn';
import RestaurantCallout from './RestaurantCallout';
import {RestaurantStackParams} from '../RestaurantNavigator';
import {
  useGetRestaurantsQuery,
  Restaurant,
} from '../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';
import baseStyles from '../../styles/baseStyles';
import restaurantStyles from '../restaurantStyles';
import ScreenBackground from '../../reusable/ScreenBackground';
// import useLocation from '../../../hooks/useLocation';

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
        const onPressMarker = () => {
          setSelectedRestaurant(restaurant.id);
          centerMarker(restaurant);
        };
        const navigate = () =>
          navigation.navigate('RestaurantDetail', {
            id: restaurant.id,
          });
        return (
          <Marker
            key={restaurant.id}
            title={restaurant.name}
            description={restaurant.cuisine}
            coordinate={{
              latitude: restaurant.coords!.latitude,
              longitude: restaurant.coords!.longitude,
            }}
            onPress={onPressMarker}
            ref={ref}>
            <Callout onPress={navigate}>
              <RestaurantCallout restaurant={restaurant} />
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

  // const renderUserMarker = () => {
  //   if (locationPermission && location) {
  //     const {latitude, longitude} = location;
  //     console.log(latitude, longitude);
  //     return (
  //       <Circle
  //         center={{latitude, longitude}}
  //         radius={100}
  //         fillColor="blue"
  //         strokeColor="black"
  //       />
  //     );
  //   }
  // };

  const syncZoomRef = (region: Region) => {
    zoomRef.current = region.latitudeDelta;
  };

  return (
    <ScrollView contentContainerStyle={baseStyles.scrollView}>
      <ScreenBackground>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={mapStyles.map}
          initialRegion={INITIAL_COORDS}
          onMapLoaded={onMapLoaded}
          onRegionChangeComplete={syncZoomRef}>
          {/* {renderUserMarker()} */}

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
      </ScreenBackground>
    </ScrollView>
  );
};

export default Map;
