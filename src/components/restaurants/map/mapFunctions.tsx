import MapView, {Region, Circle} from 'react-native-maps';
import {Dimensions} from 'react-native';

import {Coordinates} from '../../../state/apis/restaurantApi/restaurantApi';
import UserMarker from './customMarker/UserMarker';

const height = Dimensions.get('screen').height;

export const RANGE_MULTIPLIER = 90000;
export const ZOOM_VALUE = 0.05;
export const INITIAL_COORDS: Region = {
  latitude: 37.81,
  longitude: -122.233,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const getVerticalOffset = (zoom: number) => {
  return zoom * (height / 3000);
};

// const getZoomMultiplier = (zoom: number) => {
//   console.log(zoom);
//   if (zoom > 0.05) {
//     return 0.01;
//   }
//   if (zoom > 0.035) {
//     return 0.01;
//   }
//   if (zoom > 0.02) {
//     return 0.005;
//   }
//   if (zoom > 0.01) {
//     return 0.003;
//   }
//   if (zoom > 0.006) {
//     return 0.002;
//   }
//   if (zoom > 0.0045) {
//     return 0.0015;
//   }
//   if (zoom > 0.003) {
//     return 0.001;
//   }
//   if (zoom > 0.002) {
//     return 0.00075;
//   }
//   if (zoom > 0.0015) {
//     return 0.0005;
//   }
//   if (zoom > 0.001) {
//     return 0.0003;
//   }
//   if (zoom > 0.0006) {
//     return 0.0001;
//   }
//   return 0.00005;
// };

// export const centerMarker = (rest: Restaurant, zoom: number, map?: MapView) => {
//   const VERTICAL_OFFSET = getVerticalOffset(zoom);
//   if (map && rest.coords) {
//     if (zoom > ZOOM_VALUE) {
//       map.animateToRegion({
//         latitude: rest.coords.latitude + VERTICAL_OFFSET,
//         longitude: rest.coords.longitude,
//         latitudeDelta: ZOOM_VALUE,
//         longitudeDelta: ZOOM_VALUE,
//       });
//     } else {
//       map.animateToRegion({
//         latitude: rest.coords.latitude + VERTICAL_OFFSET,
//         longitude: rest.coords.longitude,
//         latitudeDelta: zoom,
//         longitudeDelta: zoom,
//       });
//     }
//   }
// };

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
