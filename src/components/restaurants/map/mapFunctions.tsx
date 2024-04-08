import MapView, {Region, Circle} from 'react-native-maps';

import {Coordinates} from '../../../state/apis/restaurantApi/restaurantApi';
import UserMarker from './customMarker/UserMarker';
import {height} from './mapStyles';

export const RANGE_MULTIPLIER = 90000;
export const ZOOM_VALUE = 0.05;
export const INITIAL_COORDS: Region = {
  latitude: 37.81,
  longitude: -122.233,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const getVerticalOffset = (zoom: number) => {
  return zoom * (height / 2500);
};

export const zoomToLocation = ({
  zoom,
  map,
  coordinates,
  offset,
}: {
  zoom: number;
  map: MapView;
  coordinates: Coordinates;
  offset?: boolean;
}) => {
  if (zoom > ZOOM_VALUE) {
    const verticalOffset = offset ? getVerticalOffset(ZOOM_VALUE) : 0;

    map.animateToRegion({
      latitude: coordinates.latitude + verticalOffset,
      longitude: coordinates.longitude,
      latitudeDelta: ZOOM_VALUE,
      longitudeDelta: ZOOM_VALUE,
    });
  } else {
    const verticalOffset = offset ? getVerticalOffset(zoom) : 0;

    map.animateToRegion({
      latitude: coordinates.latitude + verticalOffset,
      longitude: coordinates.longitude,
      latitudeDelta: zoom,
      longitudeDelta: zoom,
    });
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
