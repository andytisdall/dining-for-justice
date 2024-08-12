import {MapMarker, Marker} from 'react-native-maps';
import {Callout} from 'react-native-maps';
import {forwardRef} from 'react';

import CalloutArrow from './CalloutArrow';
import RestaurantCallout from './RestaurantCallout';
import {Restaurant} from '../../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from '../mapStyles';

const COCKTAIL_MARKER = require('../../../../assets/mapIcons/cocktail_marker.png');
const RESTAURANT_MARKER = require('../../../../assets/mapIcons/restaurant_marker.png');

const CustomMarker = forwardRef(
  (
    {
      restaurant,
      restaurantLink,
      selectRestaurant,
    }: {
      restaurant: Restaurant;
      restaurantLink: () => void;
      selectRestaurant: (rest: Restaurant) => void;
    },
    ref: React.ForwardedRef<MapMarker>,
  ) => {
    const icon =
      restaurant.cuisine === 'cocktails' ? COCKTAIL_MARKER : RESTAURANT_MARKER;

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
        image={icon}
        style={[style]}>
        <Callout onPress={restaurantLink} tooltip={true}>
          <RestaurantCallout restaurant={restaurant} />
          <CalloutArrow />
        </Callout>
      </Marker>
    );
  },
);

export default CustomMarker;
