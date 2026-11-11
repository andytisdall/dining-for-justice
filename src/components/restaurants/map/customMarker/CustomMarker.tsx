import { MapMarker, Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps';
import { Ref } from 'react';

import { Restaurant } from '@community-kitchens/apiinterfaces';
import CalloutArrow from './CalloutArrow';
import RestaurantCallout from './RestaurantCallout';
import mapStyles from '../mapStyles';
// import { ImageURISource } from 'react-native';

// const COCKTAIL_MARKER = require('../../../../assets/mapIcons/cocktail_marker.png');
// import RESTAURANT_MARKER from '../../../../assets/mapIcons/restaurant_marker.png';

const CustomMarker = ({
  ref,
  restaurant,
  restaurantLink,
  selectRestaurant,
}: {
  ref: Ref<MapMarker>;
  restaurant: Restaurant;
  restaurantLink: () => void;
  selectRestaurant: (rest: Restaurant) => void;
}) => {
  // const icon =
  //   restaurant.cuisine === 'cocktails' ? COCKTAIL_MARKER : RESTAURANT_MARKER;
  //   uri: require('./restaurant_marker.png'),
  // };
  const style = ref ? mapStyles.selectedMarker : undefined;

  return (
    <Marker
      coordinate={{
        latitude: restaurant.coords!.latitude,
        longitude: restaurant.coords!.longitude,
      }}
      onPress={() => {
        selectRestaurant(restaurant);
      }}
      ref={ref}
      style={style}
      tracksViewChanges={false}
    >
      <Callout onPress={restaurantLink} tooltip={true}>
        <RestaurantCallout restaurant={restaurant} />
        <CalloutArrow />
      </Callout>
    </Marker>
  );
};

export default CustomMarker;
