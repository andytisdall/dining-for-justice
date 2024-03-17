import {Platform, FlatList} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region, MapMarker} from 'react-native-maps';
import {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import useFilter from '../../../hooks/useFilter/useFilter';
import {RestaurantStackParams} from '../RestaurantNavigator';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import {
  useGetLocationQuery,
  useGetPermissionMutation,
} from '../../../state/apis/rewardsApi/locationApi';
import mapStyles from './mapStyles';
import baseStyles from '../../styles/baseStyles';
import ScreenBackground from '../../reusable/ScreenBackground';
import useEnableLocation from '../../../hooks/useEnableLocation';
import MapHeader from './MapHeader';
import CustomMarker from './CustomMarker';
import MapRestaurantList from './MapRestaurantList';
import RestaurantList from '../RestaurantList';
import {
  INITIAL_COORDS,
  renderRangeCircle,
  zoomToLocation,
  centerMarker,
  renderUserMarker,
  resetMap,
} from './mapFunctions';

type MapScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantMap'
>;

const Map = ({navigation, route}: MapScreenProps) => {
  const {id} = route.params;

  const [selectedRestaurant, setSelectedRestaurant] = useState(id);
  const [zoom, setZoom] = useState(INITIAL_COORDS.latitudeDelta);

  const {data: restaurants} = useGetRestaurantsQuery();
  const {data: location} = useGetLocationQuery();

  const [sortedRestaurants, filterComponent, range, orderByComponent] =
    useFilter(restaurants);

  const [getPermission, {data: locationPermission}] =
    useGetPermissionMutation();
  const [openEnableLocationModal, enableLocationModal] = useEnableLocation();

  const markerRef = useRef<MapMarker>(null);
  const mapRef = useRef<MapView>(null);
  const initialLoadRef = useRef(false);

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  useEffect(() => {
    if (selectedRestaurant && Platform.OS === 'android' && markerRef.current) {
      markerRef.current.showCallout();
    }
  }, [selectedRestaurant]);

  const restaurant = sortedRestaurants?.find(r => r.id === selectedRestaurant);

  const navigate = useCallback(
    (restaurantId: string) => {
      navigation.navigate('RestaurantDetail', {id: restaurantId});
    },
    [navigation],
  );

  const onMapLoaded = useCallback(() => {
    if (
      !initialLoadRef.current &&
      markerRef.current &&
      mapRef.current &&
      restaurant
    ) {
      markerRef.current.showCallout();
      centerMarker(restaurant, zoom, mapRef.current);
      initialLoadRef.current = true;
    }
  }, [restaurant, zoom]);

  const markers = useMemo(() => {
    return sortedRestaurants
      ?.filter(r => r.coords)
      .map(rest => {
        const isSelectedRestaurant = rest.id === selectedRestaurant;
        const ref = isSelectedRestaurant ? markerRef : undefined;
        const selectRestaurant = () => {
          setSelectedRestaurant(rest.id);
          if (mapRef.current) {
            centerMarker(rest, zoom, mapRef.current);
          }
        };
        const restaurantLink = () => navigate(rest.id);

        return (
          <CustomMarker
            restaurant={rest}
            selectRestaurant={selectRestaurant}
            ref={ref}
            restaurantLink={restaurantLink}
          />
        );
      });
  }, [sortedRestaurants, selectedRestaurant, navigate, zoom]);

  const syncZoomRef = (region: Region) => {
    setZoom(region.latitudeDelta);
  };

  const onLocationPress = useCallback(() => {
    const ZtoL = () => zoomToLocation(zoom, mapRef.current, location);
    locationPermission
      ? ZtoL()
      : getPermission()
          .unwrap()
          .then(permission => {
            if (!permission) {
              openEnableLocationModal();
            } else {
              ZtoL();
            }
          });
  }, [
    getPermission,
    location,
    locationPermission,
    openEnableLocationModal,
    zoom,
  ]);

  const mapHeader = useMemo(() => {
    return (
      <MapHeader
        resetMap={() => {
          if (mapRef.current) {
            resetMap(mapRef.current);
          }
        }}
        onLocationPress={onLocationPress}>
        {filterComponent}
      </MapHeader>
    );
  }, [filterComponent, onLocationPress]);

  const map = useMemo(() => {
    return (
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={mapStyles.map}
        initialRegion={INITIAL_COORDS}
        onMapLoaded={onMapLoaded}
        onRegionChangeComplete={syncZoomRef}>
        {renderUserMarker(locationPermission, location)}
        {markers}
        {renderRangeCircle(range, location)}
      </MapView>
    );
  }, [location, markers, onMapLoaded, range, locationPermission]);

  const mapRestaurantList = useMemo(() => {
    return (
      <MapRestaurantList orderByComponent={orderByComponent}>
        <RestaurantList navigate={navigate} />
      </MapRestaurantList>
    );
  }, [navigate, orderByComponent]);

  const data = [mapHeader, map, mapRestaurantList];

  if (enableLocationModal) {
    data.push(enableLocationModal);
  }

  const renderItem = ({item}: {item: JSX.Element}) => item;

  return (
    <ScreenBackground>
      <FlatList
        style={baseStyles.scrollView}
        data={data}
        renderItem={renderItem}
      />
    </ScreenBackground>
  );
};

export default Map;
