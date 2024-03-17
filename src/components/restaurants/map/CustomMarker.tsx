import {MapMarker, Marker} from 'react-native-maps';
import {Callout} from 'react-native-maps';
import RestaurantCallout from './RestaurantCallout';

import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';
import {forwardRef} from 'react';

const COCKTAIL_MARKER = require('../../../assets/cocktail_marker_ios.png');

const RESTAURANT_MARKER = require('../../../assets/restaurant_marker_ios.png');

const CustomMarker = forwardRef(
  (
    {
      restaurant,
      restaurantLink,
      selectRestaurant,
    }: {
      restaurant: Restaurant;
      restaurantLink: () => void;
      selectRestaurant: () => void;
    },
    ref: React.ForwardedRef<MapMarker>,
  ) => {
    const icon =
      restaurant.cuisine === 'cocktails' ? COCKTAIL_MARKER : RESTAURANT_MARKER;

    const style = ref ? mapStyles.selectedMarker : undefined;

    return (
      <Marker
        key={restaurant.id}
        coordinate={{
          latitude: restaurant.coords!.latitude,
          longitude: restaurant.coords!.longitude,
        }}
        onPress={selectRestaurant}
        ref={ref}
        image={icon}
        style={[style]}>
        <Callout onPress={restaurantLink}>
          <RestaurantCallout restaurant={restaurant} />
        </Callout>
      </Marker>
    );
  },
);

export default CustomMarker;
