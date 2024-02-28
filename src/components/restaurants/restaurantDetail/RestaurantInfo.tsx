import {View, Text} from 'react-native';

import restaurantDetailStyles from './restaurantDetailStyles';
import baseStyles from '../../styles/baseStyles';
import {
  Restaurant,
  RestaurantDetails,
} from '../../../state/apis/restaurantApi/restaurantApi';

const RestaurantInfo = ({
  restaurant,
  details,
}: {
  restaurant: Restaurant;
  details?: RestaurantDetails;
}) => {
  const detail = (detailName: string, detailText: string) => {
    return (
      <View style={restaurantDetailStyles.restaurantDetailItem}>
        <Text style={baseStyles.inputLabel}>{detailName}: </Text>
        <Text style={baseStyles.textSm}>{detailText}</Text>
      </View>
    );
  };
  return (
    <View style={baseStyles.screenSection}>
      {!!restaurant.cuisine && detail('Type of Food', restaurant.cuisine)}
      {!!details?.address && detail('Address', details.address)}
    </View>
  );
};

export default RestaurantInfo;
