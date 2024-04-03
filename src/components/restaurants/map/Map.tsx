import {FlatList, Dimensions, Text, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region, MapMarker} from 'react-native-maps';
import {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import useFilter from '../../../hooks/useFilter/useFilter';
import {RestaurantStackParams} from '../RestaurantNavigator';
import {
  Restaurant,
  useGetRestaurantsQuery,
} from '../../../state/apis/restaurantApi/restaurantApi';
import {
  useGetLocationQuery,
  useGetPermissionMutation,
} from '../../../state/apis/rewardsApi/locationApi';
import mapStyles from './mapStyles';
import baseStyles from '../../styles/baseStyles';
import ScreenBackground from '../../reusable/ScreenBackground';
import useEnableLocation from '../../../hooks/useEnableLocation';
import MapHeader from './MapHeader';
import CustomMarker from './customMarker/CustomMarker';
import MapRestaurantList from './MapRestaurantList';
import RestaurantList from '../restaurantList/RestaurantList';
import {
  INITIAL_COORDS,
  renderRangeCircle,
  zoomToLocation,
  renderUserMarker,
  resetMap,
} from './mapFunctions';
import useRespondToScroll from '../../../hooks/useRespondToScroll';
import Btn from '../../reusable/Btn';

type MapScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantMap'
>;

const height = Dimensions.get('screen').height;

const Map = ({navigation, route}: MapScreenProps) => {
  const {id} = route.params;

  const [selectedRestaurant, setSelectedRestaurant] = useState(id);

  const {data: restaurants} = useGetRestaurantsQuery();
  const {data: location} = useGetLocationQuery();

  const [
    sortedRestaurants,
    filterComponent,
    range,
    orderByComponent,
    resetFilter,
  ] = useFilter(restaurants);
  const [onScroll, PopUp] = useRespondToScroll(height);

  const [getPermission, {data: locationPermission}] =
    useGetPermissionMutation();
  const [openEnableLocationModal, enableLocationModal] = useEnableLocation();

  const markerRef = useRef<MapMarker>(null);
  const mapRef = useRef<MapView>(null);
  const listRef = useRef<FlatList>(null);
  const restaurantRef = useRef(id);
  const zoomRef = useRef(INITIAL_COORDS.latitudeDelta);
  const initialLoadRef = useRef(false);

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  const restaurant = sortedRestaurants?.find(r => r.id === selectedRestaurant);

  useEffect(() => {
    if (restaurant && markerRef.current) {
      markerRef.current.showCallout();
      if (Platform.OS === 'android') {
        markerRef.current.showCallout();
      }
    }
  }, [restaurant]);

  const centerRestaurant = useCallback((rest: Restaurant) => {
    if (rest.coords && mapRef.current) {
      zoomToLocation({
        coordinates: rest.coords,
        zoom: zoomRef.current,
        map: mapRef.current,
        offset: true,
      });
    }
  }, []);

  const navigateToRestaurant = useCallback(
    (restaurantId: string) => {
      navigation.navigate('RestaurantDetail', {id: restaurantId});
    },
    [navigation],
  );

  const onPressRestaurantListItem = useCallback(
    (restaurantId: string) => {
      const rest = sortedRestaurants?.find(r => r.id === restaurantId);
      if (rest?.coords) {
        centerRestaurant(rest);
        scrollToTop();
      }
      restaurantRef.current = restaurantId;
    },
    [sortedRestaurants, centerRestaurant],
  );

  const onMapLoaded = useCallback(() => {
    if (
      !initialLoadRef.current &&
      markerRef.current &&
      mapRef.current &&
      restaurant?.coords
    ) {
      markerRef.current.showCallout();
      centerRestaurant(restaurant);
      initialLoadRef.current = true;
    }
  }, [restaurant, centerRestaurant]);

  const markers = useMemo(() => {
    return sortedRestaurants
      ?.filter(r => r.coords)
      .map(rest => {
        const isSelectedRestaurant = rest.id === selectedRestaurant;
        const ref = isSelectedRestaurant ? markerRef : undefined;
        const selectRestaurant = () => {
          centerRestaurant(rest);
          restaurantRef.current = rest.id;
        };
        const restaurantLink = () => navigateToRestaurant(rest.id);

        return (
          <CustomMarker
            restaurant={rest}
            selectRestaurant={selectRestaurant}
            ref={ref}
            restaurantLink={restaurantLink}
            key={rest.id}
          />
        );
      });
  }, [
    sortedRestaurants,
    navigateToRestaurant,
    selectedRestaurant,
    centerRestaurant,
  ]);

  const syncStateToMap = useCallback((region: Region) => {
    zoomRef.current = region.latitudeDelta;
    setSelectedRestaurant(restaurantRef.current);
  }, []);

  const zoomToUserLocation = useCallback(async () => {
    if (!locationPermission) {
      const permission = await getPermission().unwrap();
      if (!permission) {
        return openEnableLocationModal();
      }
    }
    if (location && mapRef.current) {
      zoomToLocation({
        zoom: zoomRef.current,
        map: mapRef.current,
        coordinates: location,
      });
      restaurantRef.current = '';
    }
  }, [getPermission, location, locationPermission, openEnableLocationModal]);

  const mapHeader = useMemo(() => {
    return (
      <MapHeader
        resetMap={() => {
          if (mapRef.current) {
            resetMap(mapRef.current);
          }
        }}
        onLocationPress={zoomToUserLocation}>
        {filterComponent}
      </MapHeader>
    );
  }, [filterComponent, zoomToUserLocation]);

  const map = useMemo(() => {
    return (
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={mapStyles.map}
        initialRegion={INITIAL_COORDS}
        onMapLoaded={onMapLoaded}
        onRegionChangeComplete={syncStateToMap}>
        {renderUserMarker(locationPermission, location)}
        {markers}
        {renderRangeCircle(range, location)}
      </MapView>
    );
  }, [
    location,
    markers,
    onMapLoaded,
    range,
    locationPermission,
    syncStateToMap,
  ]);

  const mapRestaurantList = useMemo(() => {
    return (
      <MapRestaurantList orderByComponent={orderByComponent}>
        <RestaurantList
          onRestaurantPress={onPressRestaurantListItem}
          restaurants={sortedRestaurants}
          resetFilterState={resetFilter}
        />
      </MapRestaurantList>
    );
  }, [
    orderByComponent,
    sortedRestaurants,
    onPressRestaurantListItem,
    resetFilter,
  ]);

  const scrollToTop = () => {
    listRef.current?.scrollToIndex({index: 0});
  };

  const goToMapBtn = useMemo(() => {
    return (
      <PopUp>
        <Btn onPress={scrollToTop}>
          <Text style={baseStyles.btnText}>Go to Map</Text>
        </Btn>
      </PopUp>
    );
  }, [PopUp]);

  const data = [mapHeader, map, mapRestaurantList];

  const renderItem = ({item}: {item: JSX.Element}) => item;

  return (
    <ScreenBackground>
      {goToMapBtn}
      {enableLocationModal}
      <FlatList
        style={baseStyles.scrollView}
        data={data}
        renderItem={renderItem}
        onScroll={onScroll}
        ref={listRef}
      />
    </ScreenBackground>
  );
};

export default Map;
