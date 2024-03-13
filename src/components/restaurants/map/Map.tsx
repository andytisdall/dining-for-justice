import {View, Text, Platform, FlatList} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  MapMarker,
  Marker,
  Callout,
  Circle,
} from 'react-native-maps';
import {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import useFilter from '../../../hooks/useFilter/useFilter';
import Btn from '../../reusable/Btn';
import RestaurantCallout from './RestaurantCallout';
import {RestaurantStackParams} from '../RestaurantNavigator';
import {
  useGetRestaurantsQuery,
  Restaurant,
} from '../../../state/apis/restaurantApi/restaurantApi';
import {
  useGetLocationQuery,
  useGetPermissionMutation,
} from '../../../state/apis/rewardsApi/locationApi';
import mapStyles from './mapStyles';
import baseStyles from '../../styles/baseStyles';
import ScreenBackground from '../../reusable/ScreenBackground';
import UserMarker from './UserMarker';
import useEnableLocation from '../../../hooks/useEnableLocation';
import RestaurantList from '../RestaurantList';
import Loading from '../../reusable/Loading';

type MapScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantMap'
>;

const RANGE_MULTIPLIER = 90000;
const ZOOM_VALUE = 0.05;

const INITIAL_COORDS: Region = {
  latitude: 37.81,
  longitude: -122.233,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const COCKTAIL_MARKER = require('../../../assets/cocktail_marker.png');

const RESTAURANT_MARKER = require('../../../assets/restaurant_marker.png');

const Map = ({navigation, route}: MapScreenProps) => {
  const {id} = route.params;

  const [selectedRestaurant, setSelectedRestaurant] = useState(id);
  const [zoom, setZoom] = useState(INITIAL_COORDS.latitudeDelta);

  const {data: restaurants, isLoading} = useGetRestaurantsQuery();

  const [sortedRestaurants, filterComponent, range] = useFilter(restaurants);

  const {data: location} = useGetLocationQuery();
  const [getPermission, {data: locationPermission}] =
    useGetPermissionMutation();
  const [openEnableLocationModal, enableLocationModal] = useEnableLocation();

  const markerRef = useRef<MapMarker>(null);
  const mapRef = useRef<MapView>(null);
  const initialLoadRef = useRef(false);

  const VERTICAL_OFFSET = useMemo(() => {
    if (zoom > 0.035) {
      return 0.01;
    }
    if (zoom > 0.02) {
      return 0.005;
    }
    if (zoom > 0.006) {
      return 0.002;
    }
    if (zoom > 0.003) {
      return 0.001;
    }
    if (zoom > 0.0015) {
      return 0.0005;
    }
    if (zoom > 0.001) {
      return 0.0003;
    }
    if (zoom > 0.0006) {
      return 0.0001;
    }
    return 0.00005;
  }, [zoom]);

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  useEffect(() => {
    if (selectedRestaurant && Platform.OS === 'android' && markerRef.current) {
      markerRef.current.showCallout();
    }
  }, [selectedRestaurant]);

  const navigate = useCallback(
    (restaurantId: string) => {
      navigation.navigate('RestaurantDetail', {id: restaurantId});
    },
    [navigation],
  );

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

  const renderRangeCircle = () => {
    if (range && location) {
      const radius = range * RANGE_MULTIPLIER;
      return (
        <Circle
          center={location}
          radius={radius}
          strokeColor="red"
          strokeWidth={2}
        />
      );
    }
  };

  const centerMarker = useCallback(
    (rest: Restaurant) => {
      if (mapRef.current && rest.coords) {
        if (zoom > ZOOM_VALUE) {
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
            latitudeDelta: zoom,
            longitudeDelta: zoom,
          });
        }
      }
    },
    [VERTICAL_OFFSET, zoom],
  );

  const markers = useMemo(() => {
    return sortedRestaurants
      ?.filter(r => r.coords)
      .map(restaurant => {
        const isSelectedRestaurant = restaurant.id === selectedRestaurant;
        const ref = isSelectedRestaurant ? markerRef : undefined;
        const onPressMarker = () => {
          setSelectedRestaurant(restaurant.id);
          centerMarker(restaurant);
        };

        const icon =
          restaurant.cuisine === 'cocktails'
            ? COCKTAIL_MARKER
            : RESTAURANT_MARKER;

        const style = isSelectedRestaurant
          ? mapStyles.selectedMarker
          : undefined;

        return (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.coords!.latitude,
              longitude: restaurant.coords!.longitude,
            }}
            onPress={onPressMarker}
            ref={ref}
            image={icon}
            style={[style]}>
            <Callout onPress={() => navigate(restaurant.id)}>
              <RestaurantCallout restaurant={restaurant} />
            </Callout>
          </Marker>
        );
      });
  }, [centerMarker, sortedRestaurants, selectedRestaurant, navigate]);

  const restaurant = sortedRestaurants?.find(r => r.id === selectedRestaurant);

  const zoomToLocation = () => {
    if (mapRef.current && location) {
      if (zoom > ZOOM_VALUE) {
        mapRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: ZOOM_VALUE,
          longitudeDelta: ZOOM_VALUE,
        });
      } else {
        mapRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: zoom,
          longitudeDelta: zoom,
        });
      }
    }
  };

  const renderUserMarker = () => {
    if (locationPermission && location) {
      const {latitude, longitude} = location;
      return <UserMarker latitude={latitude} longitude={longitude} />;
    }
  };

  const syncZoomRef = (region: Region) => {
    setZoom(region.latitudeDelta);
  };

  const locationLink = locationPermission
    ? zoomToLocation
    : () => {
        getPermission()
          .unwrap()
          .then(permission => {
            if (!permission) {
              openEnableLocationModal();
            } else {
              zoomToLocation();
            }
          });
      };

  const mapBtns = (
    <View style={mapStyles.mapBtns}>
      <Btn onPress={locationLink}>
        <Text style={baseStyles.btnTextSm}>My Location</Text>
      </Btn>
      <Btn onPress={() => mapRef.current?.animateToRegion(INITIAL_COORDS)}>
        <Text style={baseStyles.btnTextSm}>Reset Map</Text>
      </Btn>
    </View>
  );

  const map = (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={mapStyles.map}
      initialRegion={INITIAL_COORDS}
      onMapLoaded={onMapLoaded}
      onRegionChangeComplete={syncZoomRef}>
      {renderUserMarker()}
      {markers}
      {renderRangeCircle()}
    </MapView>
  );

  const restaurantList = isLoading ? (
    <Loading />
  ) : (
    <RestaurantList restaurants={sortedRestaurants} navigate={navigate} />
  );

  const data = [filterComponent, mapBtns, map, restaurantList];

  if (enableLocationModal) {
    data.push(enableLocationModal);
  }

  return (
    <ScreenBackground>
      <FlatList
        style={baseStyles.scrollView}
        data={data}
        renderItem={({item}) => item}
      />
    </ScreenBackground>
  );
};

export default Map;
