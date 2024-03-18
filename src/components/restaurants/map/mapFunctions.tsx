import MapView, {Region, Circle} from 'react-native-maps';

import {
  Coordinates,
  Restaurant,
} from '../../../state/apis/restaurantApi/restaurantApi';
import UserMarker from './UserMarker';
import {sizeMultiplier} from '../../styles/baseStyles';

export const RANGE_MULTIPLIER = 90000;
export const ZOOM_VALUE = 0.05;
export const INITIAL_COORDS: Region = {
  latitude: 37.81,
  longitude: -122.233,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export const getVerticalOffset = (zoom: number) => {
  return getZoomMultiplier(zoom) * sizeMultiplier * 2;
};

const getZoomMultiplier = (zoom: number) => {
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
};

export const centerMarker = (rest: Restaurant, zoom: number, map?: MapView) => {
  const VERTICAL_OFFSET = getVerticalOffset(zoom);
  if (map && rest.coords) {
    if (zoom > ZOOM_VALUE) {
      map.animateToRegion({
        latitude: rest.coords.latitude + VERTICAL_OFFSET,
        longitude: rest.coords.longitude,
        latitudeDelta: ZOOM_VALUE,
        longitudeDelta: ZOOM_VALUE,
      });
    } else {
      map.animateToRegion({
        latitude: rest.coords.latitude + VERTICAL_OFFSET,
        longitude: rest.coords.longitude,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      });
    }
  }
};

export const zoomToLocation = (
  zoom: number,
  map?: MapView | null,
  location?: Coordinates | null,
) => {
  if (map && location) {
    if (zoom > ZOOM_VALUE) {
      map.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: ZOOM_VALUE,
        longitudeDelta: ZOOM_VALUE,
      });
    } else {
      map.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      });
    }
  }
};

export const renderRangeCircle = (
  range?: number,
  location?: Coordinates | null,
) => {
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

export const resetMap = (map: MapView) => map.animateToRegion(INITIAL_COORDS);

export const renderUserMarker = (
  locationPermission?: boolean,
  location?: Coordinates | null,
) => {
  if (locationPermission && location) {
    const {latitude, longitude} = location;
    return <UserMarker latitude={latitude} longitude={longitude} />;
  }
};
