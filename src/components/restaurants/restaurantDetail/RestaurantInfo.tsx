import {View, Text} from 'react-native';
import {useEffect} from 'react';

import restaurantDetailStyles from './restaurantDetailStyles';
import baseStyles from '../../styles/baseStyles';
import {
  Restaurant,
  useGetRestaurantDetailsQuery,
  useUpdateRestaurantMutation,
} from '../../../state/apis/restaurantApi/restaurantApi';
import AnimatedLoading from '../../reusable/AnimatedLoading';

const RestaurantInfo = ({restaurant}: {restaurant: Restaurant}) => {
  const {data: details, isLoading} = useGetRestaurantDetailsQuery(
    restaurant.googleId,
  );

  const [updateRestaurant] = useUpdateRestaurantMutation();

  useEffect(() => {
    // see if there are any differences in the hours in salesforce and the hours in google, and get geocoordinates if they do not exist on the salesforce account

    if (
      restaurant &&
      details &&
      (JSON.stringify(restaurant.openHours) !==
        JSON.stringify(details.openHours) ||
        (restaurant.googleId && !restaurant.coords?.latitude))
    ) {
      updateRestaurant(restaurant.id);
    }
  }, [details, restaurant, updateRestaurant]);

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
