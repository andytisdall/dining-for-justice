import {FlatList, Dimensions, Text, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region, MapMarker} from 'react-native-maps';
import {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import useFilter from '../../../hooks/useFilter/useFilter';
import {
  // Coordinates,
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
import {MapScreenProps} from '../../../navigation/types';

const height = Dimensions.get('screen').height;

const Map = ({navigation, route}: MapScreenProps) => {
  const {id} = route.params;

  const [selectedRestaurant, setSelectedRestaurant] = useState(id);

  const {data: restaurants} = useGetRestaurantsQuery();
  const {data: location} = useGetLocationQuery();

  const [
    sortedRestaurants,
    filterComponent,
    checkboxComponent,
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
  // const restaurantRef = useRef(id);
  const zoomRef = useRef(INITIAL_COORDS.latitudeDelta);
  const initialLoadRef = useRef(false);

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  const restaurant = sortedRestaurants?.find(r => r.id === selectedRestaurant);

  const showCalloutIfAndroid = () => {
    if (markerRef.current && Platform.OS === 'android') {
      markerRef.current.showCallout();
    }
  };

  // useEffect(() => {
  //   if (restaurant?.coords && markerRef.current && mapRef.current) {
  //     markerRef.current.showCallout();
  //   }
  // }, [restaurant]);

  const centerRestaurant = useCallback((rest: Restaurant) => {
    if (rest.coords && mapRef.current) {
      zoomToLocation({
        coordinates: rest.coords,
        zoom: zoomRef.current,
        map: mapRef.current,
        offset: true,
      });
      setTimeout(() => {
        showCalloutIfAndroid();
      }, 1000);
    }
  }, []);

  const navigateToRestaurant = useCallback(
    (restaurantId: string) => {
      navigation.push('RestaurantDetail', {id: restaurantId});
    },
    [navigation],
  );

  const onPressRestaurantListItem = useCallback(
    (restaurantId: string) => {
      RNReactNativeHapticFeedback.trigger('impactLight');
      const rest = sortedRestaurants?.find(r => r.id === restaurantId);
      if (rest?.coords) {
        centerRestaurant(rest);
        scrollToTop();
      }
      setSelectedRestaurant(restaurantId);
      setTimeout(() => {
        markerRef.current?.showCallout();
        showCalloutIfAndroid();
      }, 500);
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

  const selectRestaurantMarker = useCallback(
    (rest: Restaurant) => {
      centerRestaurant(rest);
      // restaurantRef.current = rest.id;
      setSelectedRestaurant(rest.id);
    },
    [centerRestaurant],
  );

  const markers = useMemo(() => {
    return sortedRestaurants
      ?.filter(r => r.coords)
      .map(rest => {
        const isSelectedRestaurant = rest.id === selectedRestaurant;
        const ref = isSelectedRestaurant ? markerRef : undefined;

        const restaurantLink = () => {
          RNReactNativeHapticFeedback.trigger('impactLight');
          navigateToRestaurant(rest.id);
        };

        return (
          <CustomMarker
            restaurant={rest}
            selectRestaurant={selectRestaurantMarker}
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
    selectRestaurantMarker,
  ]);

  const syncStateToMap = useCallback((region: Region) => {
    // zoomRef.current = region.latitudeDelta;
    // zoomToLocation({
    //   coordinates: region,
    //   zoom: region.latitudeDelta,
    //   map: mapRef.current!,
    //   offset: true,
    // });
    // mapRef.current?.setCamera({
    //   zoom: region.latitudeDelta,
    //   center: {latitude: region.latitude, longitude: region.longitude},
    // });
    // markerRef?.current?.showCallout();
    zoomRef.current = region.latitudeDelta;
  }, []);

  const zoomToUserLocation = useCallback(async () => {
    RNReactNativeHapticFeedback.trigger('impactLight');
    const permission = await getPermission().unwrap();
    if (!permission) {
      return openEnableLocationModal();
    }
    if (location && mapRef.current) {
      zoomToLocation({
        zoom: zoomRef.current,
        map: mapRef.current,
        coordinates: location,
      });
      markerRef.current?.hideCallout();
    }
  }, [getPermission, location, openEnableLocationModal]);

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
        {checkboxComponent}
      </MapHeader>
    );
  }, [filterComponent, zoomToUserLocation, checkboxComponent]);

  // const adjustZoom = (coordinates: Coordinates) => {
  //   if (mapRef.current) {
  //     zoomToLocation({
  //       coordinates,
  //       map: mapRef.current,
  //       zoom: zoomRef.current,
  //       offset: true,
  //     });
  //   }
  // };

  const map = useMemo(() => {
    return (
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={mapStyles.map}
        initialRegion={INITIAL_COORDS}
        onMapLoaded={onMapLoaded}
        onRegionChange={syncStateToMap}>
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

  const data = [map, mapHeader, mapRestaurantList];

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
