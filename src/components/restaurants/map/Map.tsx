import {FlatList, Dimensions, Text, Platform, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region, MapMarker} from 'react-native-maps';
import {useRef, useState, useMemo, useCallback} from 'react';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import useFilter from '../../../hooks/useFilter/useFilter';
import {
  // Coordinates,
  Restaurant,
  useGetRestaurantsQuery,
} from '../../../state/apis/restaurantApi/restaurantApi';
import UserMarker from './customMarker/UserMarker';
import mapStyles from './mapStyles';
import baseStyles from '../../styles/baseStyles';
import ScreenBackground from '../../reusable/ScreenBackground';
import useEnableLocation from '../../../hooks/useEnableLocation';
import MapHeader from './MapHeader';
import CustomMarker from './customMarker/CustomMarker';
import RestaurantList from '../restaurantList/RestaurantList';
import {
  INITIAL_COORDS,
  renderRangeCircle,
  zoomToLocation,
  resetMap,
} from './mapFunctions';
import useRespondToScroll from '../../../hooks/useRespondToScroll';
import Btn from '../../reusable/Btn';
import {MapScreenProps} from '../../../navigation/types';
import useLocation from '../../../hooks/useLocation';
import {useGetPermissionMutation} from '../../../state/apis/rewardsApi/locationApi';
import RestaurantDetector from '../restaurantList/RestaurantDetector';

const height = Dimensions.get('screen').height;

const Map = ({navigation, route}: MapScreenProps) => {
  const {id} = route.params;

  const [selectedRestaurant, setSelectedRestaurant] = useState(id);

  const [getPermission] = useGetPermissionMutation();
  const {data: restaurants} = useGetRestaurantsQuery();
  const location = useLocation();

  const [
    sortedRestaurants,
    filterComponent,
    checkboxComponent,
    range,
    orderByComponent,
    resetFilter,
  ] = useFilter(restaurants);
  const [onScroll, PopUp] = useRespondToScroll(height);

  const [openEnableLocationModal, enableLocationModal] = useEnableLocation();

  const markerRef = useRef<MapMarker>(null);
  const mapRef = useRef<MapView>(null);
  const listRef = useRef<FlatList>(null);
  const zoomRef = useRef(INITIAL_COORDS.latitudeDelta);
  const initialLoadRef = useRef(false);

  const restaurant = sortedRestaurants?.find(r => r.id === selectedRestaurant);

  const userMarker = useMemo(() => {
    if (location) {
      const {latitude, longitude} = location;
      return <UserMarker latitude={latitude} longitude={longitude} />;
    }
  }, [location]);

  const showCalloutIfAndroid = () => {
    if (markerRef.current && Platform.OS === 'android') {
      markerRef.current.showCallout();
    }
  };

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
      if (Platform.OS === 'android') {
        setSelectedRestaurant(rest.id);
      }
    },
    [centerRestaurant],
  );

  const markers = useMemo(() => {
    return sortedRestaurants
      ?.filter(r => r.coords && !r.closed)
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

  const map = useMemo(() => {
    return (
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={mapStyles.map}
        initialRegion={INITIAL_COORDS}
        onMapLoaded={onMapLoaded}
        onRegionChange={syncStateToMap}>
        {userMarker}
        {markers}
        {renderRangeCircle(range, location)}
      </MapView>
    );
  }, [location, markers, onMapLoaded, range, syncStateToMap, userMarker]);

  const mapRestaurantList = useMemo(() => {
    return (
      <View>
        <View style={mapStyles.listBtns}>{orderByComponent}</View>
        <RestaurantList
          onRestaurantPress={onPressRestaurantListItem}
          restaurants={sortedRestaurants}
          resetFilterState={resetFilter}
        />
      </View>
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

  const data = [<RestaurantDetector />, map, mapHeader, mapRestaurantList];

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
