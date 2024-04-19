import {View, Text} from 'react-native';

import restaurantDetailStyles from './restaurantDetailStyles';
import baseStyles from '../../styles/baseStyles';
import {
  Restaurant,
  useGetRestaurantDetailsQuery,
} from '../../../state/apis/restaurantApi/restaurantApi';
import AnimatedLoading from '../../reusable/AnimatedLoading';

const RestaurantInfo = ({restaurant}: {restaurant: Restaurant}) => {
  const {data: details, isLoading} = useGetRestaurantDetailsQuery(
    restaurant.googleId,
  );
  const detail = (detailName: string, detailText: string) => {
    return (
      <View style={restaurantDetailStyles.restaurantDetailItem}>
        <Text style={baseStyles.inputLabel}>{detailName}: </Text>
        <Text style={baseStyles.textSm}>{detailText}</Text>
      </View>
    );
  };

  const renderRestaurantInfo = () => {
    return (
      <>
        {restaurant.cuisine &&
          restaurant.cuisine !== 'cocktails' &&
          detail('Type of Food', restaurant.cuisine)}
        {!!details?.address && detail('Address', details.address)}
      </>
    );
  };

  if (isLoading) {
    return (
      <View style={baseStyles.loadingContainer}>
        <AnimatedLoading />
      </View>
    );
  }

  return <View style={baseStyles.screenSection}>{renderRestaurantInfo()}</View>;
};

export default RestaurantInfo;
