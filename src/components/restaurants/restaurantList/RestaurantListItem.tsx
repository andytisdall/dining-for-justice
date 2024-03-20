import {Pressable, View, Text} from 'react-native';
import {useMemo, memo} from 'react';
import FastImage from 'react-native-fast-image';

import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import restaurantListItemStyles from './restaurantListItemStyles';

const RestaurantListItem = memo(
  ({
    restaurant,
    navigate,
  }: {
    restaurant: Restaurant;
    navigate: (id: string) => void;
  }) => {
    const cuisine =
      restaurant.cuisine === 'cocktails'
        ? 'Cocktails for a Cause'
        : restaurant.cuisine;

    const image = useMemo(() => {
      return restaurant.photo ? (
        <FastImage
          source={{uri: restaurant.photo}}
          style={restaurantListItemStyles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={restaurantListItemStyles.image} />
      );
    }, [restaurant.photo]);

    return (
      <Pressable
        onPress={() => {
          navigate(restaurant.id);
        }}>
        {({pressed}) => {
          const pressedStyle = getPressedStyle(pressed);
          return (
            <View
              style={[
                restaurantListItemStyles.restaurantListItem,
                pressedStyle,
              ]}>
              <Text
                style={[
                  baseStyles.text,
                  baseStyles.centerText,
                  restaurantListItemStyles.title,
                ]}>
                {restaurant.name}
              </Text>
              {image}
              <Text
                style={[
                  baseStyles.textXSm,
                  restaurantListItemStyles.cuisine,
                  baseStyles.centerText,
                ]}>
                {cuisine}
              </Text>
            </View>
          );
        }}
      </Pressable>
    );
  },
);

export default RestaurantListItem;
