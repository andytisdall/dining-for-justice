import { View, Text, Pressable } from 'react-native';
import { useEffect } from 'react';
import { showLocation } from 'react-native-map-link';

import restaurantDetailStyles from './restaurantDetailStyles';
import baseStyles from '../../styles/baseStyles';
import {
  useGetRestaurantDetailsQuery,
  useUpdateRestaurantMutation,
} from '../../../state/apis/restaurantApi/restaurantApi';
import AnimatedLoading from '../../reusable/AnimatedLoading';
import { Restaurant } from '@community-kitchens/apiinterfaces';

const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {
  const { data: details, isLoading } = useGetRestaurantDetailsQuery(
    restaurant.googleId,
  );

  const [updateRestaurant] = useUpdateRestaurantMutation();

  useEffect(() => {
    // see if there are any differences in the hours in salesforce and the hours in google, and get geocoordinates if they do not exist on the salesforce account
    // also url

    if (
      restaurant &&
      details &&
      (JSON.stringify(restaurant.openHours) !==
        JSON.stringify(details.openHours) ||
        (restaurant.googleId && !restaurant.coords?.latitude) ||
        restaurant.url !== details.url)
    ) {
      updateRestaurant(restaurant.id);
    }
  }, [details, restaurant, updateRestaurant]);

  const renderRestaurantInfo = () => {
    return (
      <>
        {restaurant.cuisine && restaurant.cuisine !== 'cocktails' && (
          <View style={restaurantDetailStyles.restaurantDetailItem}>
            <Text style={baseStyles.inputLabel}>Type of Food: </Text>
            <Text style={baseStyles.textSm}>{restaurant.cuisine}</Text>
          </View>
        )}
        {!!details?.address && (
          <Pressable
            style={restaurantDetailStyles.restaurantDetailItem}
            onPress={() => showLocation({ address: `${details.address}` })}
          >
            <Text style={baseStyles.inputLabel}>Address: </Text>
            <Text style={[baseStyles.textSm, restaurantDetailStyles.address]}>
              {details.address}
            </Text>
          </Pressable>
        )}
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
